import { Chat } from "@/components/dashboard/Chat";

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <div className="rise">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Messages</h1>
        <p className="mt-2 text-muted">Ask about a refund, a transfer or your bank details.</p>
      </div>
      <div style={{ "--i": 1 } as React.CSSProperties} className="rise max-w-3xl">
        <Chat />
      </div>
    </div>
  );
}
