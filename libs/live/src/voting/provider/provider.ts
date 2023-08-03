import { ProviderPropsBase } from "../../provider";
import { Poll } from "../../schema";
import { SupabaseVoting, SupabaseVotingProps } from "./provider.supabase";

export type VotingPropsBase = {
  _platform: "Voting";
} & ProviderPropsBase;

export type VotingProps = SupabaseVotingProps;
export type VotingClients = SupabaseVoting["_client"];

export class Voting<C = VotingClients> {
  _provider: VotingPropsBase["provider"];
  _client: C;

  constructor(props: VotingProps) {
    switch (props.provider) {
      case "supabase": {
        this._provider = "supabase";
        const supabase = new SupabaseVoting({
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
    const _client = this._client as VotingProps["_client"];

    switch (this._provider) {
      case "supabase": {
        return new SupabaseVoting({
          _platform: "Voting",
          provider: "supabase",
          _client,
        });
      }
    }
  }

  async getVotingPolls(
    { wallet }: { wallet: string },
  ): Promise<Poll[] | null | Error> {
    return this.into().getVotingPolls({ wallet });
  }

  async castVotingPoll(
    { wallet, pollId, choiceId }: {
      wallet: string;
      pollId: number;
      choiceId: number;
    },
  ): Promise<undefined | Error> {
    return this.into().castVotingPoll({ wallet, pollId, choiceId });
  }
}
