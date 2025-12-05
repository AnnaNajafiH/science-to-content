import type {
  Trend,
  GeneratedContent,
  InternalBrief,
  RDDocument,
  TrustScore,
} from "../types/index";
import * as trends from "./trustService";
import * as generation from "./generationService";
import * as rd from "./rdService";
import * as brief from "./briefService";
import * as trust from "./trustService";

// Facade preserving the original contentService API while delegating to
// smaller, page-focused service modules.

class ContentEcosystemService {
  // Trend Detection
  async getTrends(): Promise<Trend[]> {
    return trends.getTrends();
  }

  async getTrendById(id: string): Promise<Trend | null> {
    return trends.getTrendsById(id);
  }

  // Content Generation
  async generateContent(
    trendId: string,
    type: string
  ): Promise<GeneratedContent> {
    return generation.generateContent(trendId, type);
  }

  async getGeneratedContent(): Promise<GeneratedContent[]> {
    return generation.getGeneratedContent();
  }

  async approveContent(
    contentId: string,
    notes?: string
  ): Promise<GeneratedContent> {
    return generation.approveContent(contentId, notes);
  }

  async rejectContent(contentId: string, reason: string): Promise<void> {
    return generation.rejectContent(contentId, reason);
  }

  async editContent(
    contentId: string,
    updates: Partial<GeneratedContent>
  ): Promise<GeneratedContent> {
    return generation.editContent(contentId, updates);
  }

  async submitForReview(content: GeneratedContent): Promise<GeneratedContent> {
    return generation.submitForReview(content);
  }

  // Trust & Fact Checking
  async getTrustScore(_contentId: string): Promise<TrustScore> {
    return trust.getTrustScore(_contentId);
  }

  // R&D Documents
  async getRDDocuments(): Promise<RDDocument[]> {
    return rd.getRDDocuments();
  }

  async getRDDocumentById(id: string): Promise<RDDocument | null> {
    return rd.getRDDocumentById(id);
  }

  // Internal Brief Generation
  async generateInternalBrief(
    rdDocumentId: string,
    audience: string
  ): Promise<InternalBrief> {
    return brief.generateInternalBrief(rdDocumentId, audience);
  }

  // Mock email sending for briefs
  async sendBriefByEmail(
    briefId: string,
    recipients: string[]
  ): Promise<{ ok: boolean }> {
    return brief.sendBriefByEmail(briefId, recipients);
  }

  async getInternalBriefs(): Promise<InternalBrief[]> {
    return brief.getInternalBriefs();
  }
}

export const contentService = new ContentEcosystemService();
