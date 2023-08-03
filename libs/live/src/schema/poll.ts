export type Poll = {
  id: number;
  name: string;
  description: string;
  voting_polls_choices: {
    id: number;
    choice: string;
    voting_polls_voters: { count: number }[];
  }[];
  voting_polls_voters: { count: number };
};
