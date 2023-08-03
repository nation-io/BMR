import { LivestreamViewer } from "../../schema";

export async function getOrNewLivestreamViewer(
  getCb: () => Promise<LivestreamViewer | null | Error>,
  newCb: () => Promise<LivestreamViewer | Error>,
): Promise<[LivestreamViewer, "created" | "existed"] | Error> {
  let livestreamViewer = await getCb();
  if (livestreamViewer instanceof Error) {
    return livestreamViewer;
  }
  if (livestreamViewer) {
    return [livestreamViewer, "existed"];
  }

  livestreamViewer = await newCb();
  if (livestreamViewer instanceof Error) {
    return livestreamViewer;
  }
  return [livestreamViewer, "created"];
}
