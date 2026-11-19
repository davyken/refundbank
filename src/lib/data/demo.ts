import type { ChatMessage, Refund, UserProfile } from "./types";

export const demoUser: UserProfile = {
  id: "usr_demo_01",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
};

export const demoRefunds: Refund[] = [
  {
    id: "rf_1042",
    transactionId: "TX-88213",
    merchant: "Northwind Air",
    reason: "Cancelled flight",
    amount: 428.9,
    currency: "EUR",
    status: "processing",
    initiatedAt: "2026-11-12",
  },
  {
    id: "rf_1041",
    transactionId: "TX-88107",
    merchant: "Atlas Electronics",
    reason: "Returned payment",
    amount: 129,
    currency: "EUR",
    status: "initiated",
    initiatedAt: "2026-11-17",
  },
  {
    id: "rf_1037",
    transactionId: "TX-87650",
    merchant: "Lumen Streaming",
    reason: "Service cancellation",
    amount: 14.99,
    currency: "EUR",
    status: "completed",
    initiatedAt: "2026-10-29",
    completedAt: "2026-11-04",
  },
  {
    id: "rf_1029",
    transactionId: "TX-86914",
    merchant: "Harbor Hotels",
    reason: "Cancelled booking",
    amount: 312.5,
    currency: "EUR",
    status: "completed",
    initiatedAt: "2026-10-08",
    completedAt: "2026-10-15",
  },
  {
    id: "rf_1018",
    transactionId: "TX-85520",
    merchant: "Kite Fitness",
    reason: "Duplicate charge",
    amount: 49,
    currency: "EUR",
    status: "completed",
    initiatedAt: "2026-09-21",
    completedAt: "2026-09-25",
  },
];

export const buildDemoChat = (firstName: string): ChatMessage[] => [
  {
    id: "m1",
    author: "agent",
    text: `Hi ${firstName}, I'm Noor from Refund Bank support. Ask me about a refund or your bank details.`,
    at: "2026-11-19T09:00:00",
  },
];
