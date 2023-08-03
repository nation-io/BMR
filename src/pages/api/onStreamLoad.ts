// Next.js API route suuport: https://nextjs.org/docs/api-routes/introduction

import { Keypair } from "@solana/web3.js";
import * as BMR from "bmr-live";
import { NextApiRequest, NextApiResponse } from "next";

const SUPABASE_ENDPOINT = process.env.NEXT_SUPABASE_ENDPOINT || "";
const SUPABASE_TOKEN = process.env.NEXT_SUPABASE_SVC_TOKEN || "";
const SOLANA_RPC = process.env.NEXT_PUBLIC_RPC || "mainnet-beta";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body;
  const streamViewerWallet = data.wallet;

  const airdropper = new BMR.Livestream.Airdropper({
    provider: new BMR.Livestream.SupabaseLivestream({
      _platform: "Livestream",
      provider: "supabase",
      url: SUPABASE_ENDPOINT,
      token: SUPABASE_TOKEN,
    }),
    rpcUrl: SOLANA_RPC,
    rewardsHashList: JSON.parse(
      process.env.NEXT_STREAM_VIEWER_NFT_TREASURY_HASH_LIST || "[]",
    ),
    rewardsAuthority: Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(
        process.env.NEXT_STREAM_VIEWER_NFT_TREASURY || "[]",
      )),
    ),
  });

  const getOrNewAction = await airdropper.getOrNewLivestreamUser({
    wallet: streamViewerWallet,
  });
  if (getOrNewAction instanceof Error) {
    return res.status(500).json({ error: getOrNewAction.message });
  }

  const [livestreamViewer, action] = getOrNewAction;
  if (action === "created") {
    const signature = await airdropper.airdropLivestreamUser({
      livestreamViewer,
    });
    return res.status(200).json({ status: "success", signature });
  }

  return res.status(200).json({ status: "success", signature: null });
}
