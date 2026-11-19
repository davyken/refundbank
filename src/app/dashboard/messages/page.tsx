"use client";

import { Chat } from "@/components/dashboard/Chat";
import { useUser } from "@/components/dashboard/SessionContext";

export default function MessagesPage() {
  const user = useUser();
  return (
    <div className="space-y-8">
      <div className="rise">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Messages</h1>
        <p className="mt-2 text-muted">Ask about a refund, a transfer or your bank details.</p>
      </div>
      <div style={{ "--i": 1 } as React.CSSProperties} className="rise max-w-3xl">
        <Chat firstName={user.name.split(" ")[0]} />
      </div>
    </div>
  );
}
