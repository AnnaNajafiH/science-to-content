import { mockInternalBriefs } from "../data/internalBriefs";
import type { InternalBrief } from "../types";

export async function generateInternalBrief(
  rdDocumentId: string,
  audience: string
): Promise<InternalBrief> {
  // Minimal mock implementation: derive a brief from the first mock and override
  const base = mockInternalBriefs[0];
  const generated: InternalBrief = {
    ...base,
    id: `ib-${Date.now()}`,
    rdDocumentId,
    targetAudience: audience,
    generatedAt: new Date().toISOString(),
    title: `Generated Brief for ${rdDocumentId}`,
  };
  return generated;
}

export async function sendBriefByEmail(
  briefId: string,
  recipients: string[]
): Promise<{ ok: boolean }> {
  // Mock sending - accept and return success
  void briefId;
  void recipients;
  return { ok: true };
}

export async function getInternalBriefs(): Promise<InternalBrief[]> {
  // Return the mock briefs
  return mockInternalBriefs;
}
