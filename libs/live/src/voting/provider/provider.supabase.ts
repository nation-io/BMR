import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Voting, VotingPropsBase } from "./provider";
import { SupabaseProvider } from "../../provider";
import { Poll } from "../../schema";

export interface SupabaseVotingProps extends VotingPropsBase {
  url?: string;
  token?: string;
  _client?: SupabaseClient;
}

export class SupabaseVoting extends SupabaseProvider
  implements Voting<SupabaseClient> {
  _provider: SupabaseVotingProps["provider"] = "supabase";

  constructor({ url, token, _platform, _client }: SupabaseVotingProps) {
    super({ _client, url, token, _platform: "Voting", provider: "supabase" });
    this._platform = _platform;
    if (url && token) {
      this._client = createClient(url, token);
    } else if (_client) {
      this._client = _client;
    } else {
      this._client = createClient(
        process.env.PROVIDER_SUPABASE_URL!,
        process.env.PROVIDER_SUPABASE_TOKEN!,
      );
    }
  }

  // no-op return this
  into() {
    return this;
  }

  async getVotingPolls(
    { wallet }: { wallet: string },
  ): Promise<Poll[] | null | Error> {
    const polls = await this._client.from("voting_polls").select(`
    id,
    name,
    description,
    voting_polls_choices (
      id,
      choice,
      voting_polls_voters (
        count
      )
    ),
    voting_polls_voters (
      count
    )
  `).eq("voting_polls_voters.wallet", wallet)
      .returns<
        Poll[]
      >();
    if (polls.error) {
      return new Error(polls.error.message);
    }
    if (!polls.data) {
      return null;
    }
    return polls.data;
  }

  async castVotingPoll(
    { wallet, pollId, choiceId }: {
      wallet: string;
      pollId: number;
      choiceId: number;
    },
  ): Promise<undefined | Error> {
    const casted = await this._client.from("voting_polls_voters").upsert({
      wallet,
      voting_polls_id: pollId,
      poll_choice_id: choiceId,
    }, { ignoreDuplicates: false })
      .select();
    if (casted.error) {
      return new Error(casted.error.message);
    }

    return undefined;
  }
}
