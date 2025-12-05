export function getTrends():
  | import("../types").Trend[]
  | PromiseLike<import("../types").Trend[]> {
  throw new Error("Function not implemented.");
}
export function getTrendsById(
  _id: string
):
  | import("../types").Trend
  | PromiseLike<import("../types").Trend | null>
  | null {
  void _id;
  throw new Error("Function not implemented.");
}

export function getTrustScore(
  _contentId: string
):
  | import("../types").TrustScore
  | PromiseLike<import("../types").TrustScore> {
  void _contentId;
  throw new Error("Function not implemented.");
}
