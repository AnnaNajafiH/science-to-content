import type{ RDDocument } from "../types/index";
import { mockRDDocuments } from "../data/rdDocuments";
import { delay } from "../data/utils";

export async function getRDDocuments(): Promise<RDDocument[]> {
  await delay(600);
  return mockRDDocuments;
}

export async function getRDDocumentById(
  id: string
): Promise<RDDocument | null> {
  await delay(300);
  return mockRDDocuments.find((doc) => doc.id === id) || null;
}
