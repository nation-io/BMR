// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import * as BMR from "bmr-live";

const SUPABASE_ENDPOINT = process.env.NEXT_SUPABASE_ENDPOINT || "";
const SUPABASE_TOKEN = process.env.NEXT_SUPABASE_SVC_TOKEN || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const voting = new BMR.Voting.Polls({
    provider: new BMR.Voting.SupabaseVoting({
      _platform: "Voting",
      provider: "supabase",
      url: SUPABASE_ENDPOINT,
      token: SUPABASE_TOKEN,
    }),
  });

  switch (req.method) {
    case "GET": {
      try {
        const { wallet }: Partial<{ wallet: string }> = req.query;
        const polls = await voting.getPolls({ wallet: wallet || "" });
        if (polls instanceof Error) {
          res.status(500).json({
            status: "error",
            error: polls.message,
          });
          return;
        }

        const pollIndex = polls.reduce(
          (acc, poll) => acc + poll.voting_polls_voters.count,
          0,
        );
        const poll = polls.length > pollIndex ? polls[pollIndex] : null;
        if (!poll) {
          res.status(204).send(null);
          return;
        }

        res.status(200).json({
          status: "success",
          poll,
        });
      } catch (e) {
        console.warn(e);
        res.status(500).json({
          status: "error",
          error: "Could not return polls",
        });
      }
      return;
    }
    case "POST": {
      try {
        const { wallet, pollId, choiceId } = req.body;
        const cast = await voting.castChoice({ wallet, pollId, choiceId });
        if (cast instanceof Error) {
          res.status(500).json({
            status: "error",
            error: cast.message,
          });
          return;
        }

        res.status(200).json({
          status: "success",
        });
      } catch (e) {
        console.warn(e);
        res.status(500).json({
          status: "error",
          error: "Could not cast poll choice",
        });
      }
      return;
    }
  }
}
