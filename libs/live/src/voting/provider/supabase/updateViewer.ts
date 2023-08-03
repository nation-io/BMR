import { Platform, PlatformViewer, Viewer } from "../../schema";

const viewerTables: Record<Platform, string> = {
  ["Livestream"]: "livestream_viewers",
  ["Voting"]: "voting_viewers",
};

export async function updateViewer<P extends Platform>(
  {
    platform,
    update,
  }: {
    platform: P;
    update: (tableName: string) => Promise<undefined | Error>;
  },
): Promise<undefined | Error> {
  const viewer = await update(viewerTables[platform]);
  if (viewer instanceof Error) return viewer;

  return;
}
