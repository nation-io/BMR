import { VotingViewer } from "../../schema";

export async function getOrNewVotingViewer(
  getCb: () => Promise<VotingViewer | null | Error>,
  newCb: () => Promise<VotingViewer | Error>,
): Promise<[VotingViewer, "created" | "existed"] | Error> {
  let streamViewer = await getCb();
  if (streamViewer instanceof Error) {
    return streamViewer;
  }
  if (streamViewer) {
    return [streamViewer, "existed"];
  }

  streamViewer = await newCb();
  if (streamViewer instanceof Error) {
    return streamViewer;
  }
  return [streamViewer, "created"];
}
