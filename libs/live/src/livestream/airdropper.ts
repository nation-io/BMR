import { clusterApiUrl, Connection, PublicKey, Signer } from "@solana/web3.js";
import { Livestream, LivestreamProps } from "./provider";
import * as Functions from "./functions";
import { LivestreamViewer } from "../schema";

export type AirdropperProps<P> = {
  provider?: Livestream<P>;
  providerProps?: LivestreamProps;
  rpcUrl: string | null;
  rewardsAuthority: Signer;
  rewardsHashList: string[];
};

export class Airdropper<P> {
  provider: Livestream<P>;
  rpcConnection: Connection;
  rewardsAuthority: Signer;
  rewardsHashList: string[];

  constructor(
    { provider, providerProps, rpcUrl, rewardsAuthority, rewardsHashList }:
      AirdropperProps<P>,
  ) {
    if (provider && providerProps) {
      throw new Error("must specify at most one provider or providerProps!");
    }
    if (providerProps) {
      this.provider = new Livestream(providerProps);
    }
    if (provider) {
      this.provider = provider;
    } else {
      throw new Error("must specify at least a provider or providerProps!");
    }

    if (rpcUrl) {
      this.rpcConnection = new Connection(rpcUrl);
    } else {
      this.rpcConnection = new Connection(clusterApiUrl("mainnet-beta"));
    }

    this.rewardsAuthority = rewardsAuthority;
    this.rewardsHashList = rewardsHashList;
  }

  async getOrNewLivestreamUser(
    { wallet }: { wallet: string },
  ): Promise<[LivestreamViewer, "created" | "existed"] | Error> {
    const livestreamUser = Functions.getOrNewLivestreamViewer(
      () => this.provider.into().getLivestreamUser({ wallet }),
      () => this.provider.into().newLivestreamUser({ wallet }),
    );

    if (livestreamUser instanceof Error) {
      return livestreamUser;
    }
    return livestreamUser;
  }

  async getRewardMint(): Promise<PublicKey | Error> {
    const totalMinted = await this.provider.into()
      .getLivestreamUsersAirdroppedTotal();
    if (totalMinted instanceof Error) {
      return totalMinted;
    }

    return Functions.getRewardMint(totalMinted, this.rewardsHashList);
  }

  async airdropLivestreamUser(
    { livestreamViewer }: { livestreamViewer: LivestreamViewer },
  ): Promise<string | null | Error> {
    return Functions.airdropLivestreamViewer({
      connection: this.rpcConnection,
      livestreamViewer,
      rewardsAuthority: this.rewardsAuthority,
      reward: () => this.getRewardMint(),
      onSuccess: () =>
        this.provider.into().airdroppedLivestreamUser({
          viewer: livestreamViewer,
        }),
    });
  }
}
