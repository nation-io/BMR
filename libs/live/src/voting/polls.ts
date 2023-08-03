import { Voting, VotingProps } from "./provider";
import { Poll } from "../schema";

export type PollsProps<P> = {
  provider?: Voting<P>;
  providerProps?: VotingProps;
};

export class Polls<P> {
  provider: Voting<P>;

  constructor(
    { provider, providerProps }: PollsProps<P>,
  ) {
    if (provider && providerProps) {
      throw new Error("must specify at most one provider or providerProps!");
    }
    if (providerProps) {
      this.provider = new Voting(providerProps);
    }
    if (provider) {
      this.provider = provider;
    } else {
      throw new Error("must specify at least a provider or providerProps!");
    }
  }

  async getPolls(
    { wallet }: { wallet: string },
  ): Promise<Poll[] | Error> {
    const polls = await this.provider.getVotingPolls({ wallet });
    if (!polls) return new Error("no polls");

    return polls;
  }

  async castChoice(
    { wallet, pollId, choiceId }: {
      wallet: string;
      pollId: number;
      choiceId: number;
    },
  ): Promise<undefined | Error> {
    return await this.provider.castVotingPoll({ wallet, pollId, choiceId });
  }
}
