import { ProviderPropsBase } from "../../provider";
import { LivestreamViewer } from "../../schema";
import {
  SupabaseLivestream,
  SupabaseLivestreamProps,
} from "./provider.supabase";

export type LivestreamPropsBase = {
  _platform: "Livestream";
} & ProviderPropsBase;

export type LivestreamProps = SupabaseLivestreamProps;
export type LivestreamClients = SupabaseLivestream["_client"];

export class Livestream<C = LivestreamClients> {
  _provider: LivestreamPropsBase["provider"];
  _client: C;

  constructor(props: LivestreamProps) {
    switch (props.provider) {
      case "supabase": {
        this._provider = "supabase";
        const supabase = new SupabaseLivestream({
          provider: props.provider,
          _client: props._client,
          _platform: props._platform,
        });
        this._client = supabase._client as C;
      }
    }
  }

  // return respective provider
  into() {
    const _client = this._client as LivestreamProps["_client"];

    switch (this._provider) {
      case "supabase": {
        return new SupabaseLivestream({
          _platform: "Livestream",
          provider: "supabase",
          _client,
        });
      }
    }
  }

  async getLivestreamUser(
    { wallet }: { wallet: string },
  ): Promise<LivestreamViewer | null | Error> {
    return this.into().getLivestreamUser({ wallet });
  }

  async newLivestreamUser(
    { wallet }: { wallet: string },
  ): Promise<LivestreamViewer | null | Error> {
    return this.into().newLivestreamUser({ wallet });
  }

  async getLivestreamUsersAirdroppedTotal(): Promise<number | Error> {
    return this.into().getLivestreamUsersAirdroppedTotal();
  }

  async airdroppedLivestreamUser(
    { viewer }: { viewer: LivestreamViewer },
  ): Promise<undefined | Error> {
    return this.into().airdroppedLivestreamUser({ viewer });
  }
}
