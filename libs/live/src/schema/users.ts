export type User<P> = P extends "Livestream" ? LivestreamViewer
  : PollVoter;

export type LivestreamViewer = {
  id: number;
  wallet: string;
  airdropped: boolean;
  created_at: Date;
};

export type PollVoter = {
  id: number;
  wallet: string;
  poll_id: number;
  poll_choice_id: number;
  created_at: Date;
};

export type PlatformUser = LivestreamViewer | PollVoter;
