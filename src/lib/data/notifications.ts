import { formatCurrency } from "../format";
import type { AppNotification, Refund } from "./types";

/** Builds the notification feed (FR04): one entry when initiated, one more when completed. */
export function buildNotifications(refunds: Refund[]): AppNotification[] {
  const feed = refunds.flatMap<AppNotification>((refund) => {
    const amount = formatCurrency(refund.amount, refund.currency);
    const items: AppNotification[] = [
      {
        id: `${refund.id}-initiated`,
        refundId: refund.id,
        kind: "initiated",
        message: `Refund of ${amount} from ${refund.merchant} was initiated.`,
        at: refund.initiatedAt,
      },
    ];
    if (refund.status === "completed" && refund.completedAt) {
      items.push({
        id: `${refund.id}-completed`,
        refundId: refund.id,
        kind: "completed",
        message: `Refund of ${amount} from ${refund.merchant} reached your bank.`,
        at: refund.completedAt,
      });
    }
    return items;
  });
  return feed.sort((a, b) => b.at.localeCompare(a.at));
}
