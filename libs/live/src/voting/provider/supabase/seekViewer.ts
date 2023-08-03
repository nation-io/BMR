import { Platform, PlatformViewer, Viewer } from "../../schema";

const viewerTables: Record<Platform, string> = {
  ["Livestream"]: "livestream_viewers",
  ["Voting"]: "voting_viewers",
};

export async function seekViewer<P extends Platform, V extends Viewer<P>>(
  {
    platform,
    select,
  }: {
    platform: P;
    select: (tableName: string) => Promise<PlatformViewer | null | Error>;
  },
): Promise<V | null | Error> {
  const viewer = await select(viewerTables[platform]);
  if (viewer instanceof Error) return viewer;
  if (viewer === null) return viewer;

  return viewer as V;
}
