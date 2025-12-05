export function getTrends():
  | import("../types/index").Trend[]
  | PromiseLike<import("../types/index").Trend[]> {
  throw new Error("Function not implemented.");
}
export function getTrendsById(
  _id: string
):
  | import("../types/index").Trend
  | PromiseLike<import("../types/index").Trend | null>
  | null {
  void _id;
  throw new Error("Function not implemented.");
}

export function getTrustScore(
  _contentId: string
):
  | import("../types/index").TrustScore
  | PromiseLike<import("../types/index").TrustScore> {
  void _contentId;
  throw new Error("Function not implemented.");
}
