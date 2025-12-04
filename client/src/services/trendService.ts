import type { Trend } from "../types";
import { mockTrends } from "../data/trends";
import { delay } from "../data/utils";

export async function getTrends(): Promise<Trend[]> {
  await delay(800);
  return mockTrends;
}

export async function getTrendById(id: string): Promise<Trend | null> {
  await delay(300);
  return mockTrends.find((t) => t.id === id) || null;
}
