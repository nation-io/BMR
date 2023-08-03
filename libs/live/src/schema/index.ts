export * from "./users";
export * from "./poll";

export type Platform = "Livestream" | "Voting";
export const Platforms: ["Livestream", "Voting"] | Platform[] = [
  "Livestream",
  "Voting",
];
