import type { GeneratedContent } from "../types/index";
import { mockGeneratedContent } from "../data/generatedContent";
import { delay } from "../data/utils";
import { createGeneratedContent } from "../data/contentTemplates";

export async function generateContent(
  trendId: string,
  type: string
): Promise<GeneratedContent> {
  await delay(2000);
  return createGeneratedContent(trendId, type);
}

export async function getGeneratedContent(): Promise<GeneratedContent[]> {
  await delay(500);
  return mockGeneratedContent;
}

export async function approveContent(
  contentId: string,
  notes?: string
): Promise<GeneratedContent> {
  await delay(600);
  const content = mockGeneratedContent.find((c) => c.id === contentId);
  if (!content) throw new Error("Content not found");

  return {
    ...content,
    status: "approved",
    reviewerNotes: notes,
    editedBy: "current.user@beiersdorf.com",
    approvedAt: new Date().toISOString(),
  };
}

export async function rejectContent(
  contentId: string,
  reason: string
): Promise<void> {
  await delay(400);
  console.log(`Content ${contentId} rejected: ${reason}`);
}

export async function editContent(
  contentId: string,
  updates: Partial<GeneratedContent>
): Promise<GeneratedContent> {
  await delay(700);
  const content = mockGeneratedContent.find((c) => c.id === contentId);
  if (!content) throw new Error("Content not found");

  return { ...content, ...updates };
}

export async function submitForReview(
  content: GeneratedContent
): Promise<GeneratedContent> {
  await delay(500);
  const toSubmit = {
    ...content,
    id: content.id || `gc${Date.now()}`,
    status: content.status || "pending",
    generatedAt: content.generatedAt || new Date().toISOString(),
  };
  mockGeneratedContent.unshift(toSubmit);
  return toSubmit;
}
