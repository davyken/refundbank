export type RefundStatus = "initiated" | "processing" | "completed";

export interface Refund {
  id: string;
  transactionId: string;
  merchant: string;
  reason: string;
  amount: number;
  currency: string;
  status: RefundStatus;
  /** ISO date the refund was initiated. */
  initiatedAt: string;
  /** ISO date the refund was completed, when it was. */
  completedAt?: string;
}

export interface AppNotification {
  id: string;
  refundId: string;
  kind: "initiated" | "completed";
  message: string;
  at: string;
}

export interface ChatMessage {
  id: string;
  author: "user" | "agent";
  text: string;
  at: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}
