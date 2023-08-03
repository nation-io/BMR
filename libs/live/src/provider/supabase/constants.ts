import { Platform } from "../../schema";

export const userTables: Record<Platform, string> = {
  ["Livestream"]: "livestream_viewers",
  ["Voting"]: "voting_polls_voters",
};
