import { LivestreamViewer } from "../../schema";

export async function getOrNewStreamViewer(
  getCb: () => Promise<LivestreamViewer | null | Error>,
  newCb: () => Promise<LivestreamViewer | Error>,
): Promise<[LivestreamViewer, "created" | "existed"] | Error> {
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
