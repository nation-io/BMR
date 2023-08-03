import { Platform, PlatformViewer, Viewer } from "../../schema";

const viewerTables: Record<Platform, string> = {
  ["Livestream"]: "livestream_viewers",
  ["Voting"]: "voting_viewers",
};

export async function newViewer<P extends Platform, V extends Viewer<P>>(
  {
    platform,
    insert,
  }: {
    platform: P;
    insert: (tableName: string) => Promise<PlatformViewer | Error>;
  },
): Promise<V | Error> {
  const viewer = await insert(viewerTables[platform]);
  if (viewer instanceof Error) return viewer;

  return viewer as V;
}
