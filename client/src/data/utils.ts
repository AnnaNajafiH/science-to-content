// Utility helpers for mock data

// Simulated API delays
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
