import { PublicKey } from "@solana/web3.js";

export async function getRewardMint(
  totalMinted: number,
  rewardsHashList: string[],
): Promise<PublicKey | Error> {
  if (totalMinted > rewardsHashList.length) {
    return new Error("out of rewards!");
  }

  const rewardMint = rewardsHashList.reduce((acc, _mint) => {
    if (acc) return acc;
    try {
      return new PublicKey(_mint);
    } catch {
      return acc;
    }
  }, null as (PublicKey | null));
  if (!rewardMint) {
    return new Error("invalid reward mints in hash list!");
  }

  return rewardMint;
}
