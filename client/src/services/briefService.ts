export function generateInternalBrief(
  _rdDocumentId: string,
  _audience: string
):
  | import("../types").InternalBrief
  | PromiseLike<import("../types").InternalBrief> {
  void _rdDocumentId;
  void _audience;
  throw new Error("Function not implemented.");
}

export function sendBriefByEmail(
  _briefId: string,
  _recipients: string[]
): { ok: boolean } | PromiseLike<{ ok: boolean }> {
  void _briefId;
  void _recipients;
  throw new Error("Function not implemented.");
}

export function getInternalBriefs():
  | import("../types").InternalBrief[]
  | PromiseLike<import("../types").InternalBrief[]> {
    throw new Error("Function not implemented.");
}
