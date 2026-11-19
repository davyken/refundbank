const REPLIES: Array<{ match: RegExp; reply: string }> = [
  {
    match: /(how long|when|delay|days)/i,
    reply:
      "Once a refund is initiated, banks usually credit the account within 5 to 10 business days. International transfers can take a little longer.",
  },
  {
    match: /(swift|bic|iban)/i,
    reply:
      "SWIFT/BIC codes have 8 or 11 characters, for example BARCGB22. You only need one for international accounts. Your bank prints it on statements.",
  },
  {
    match: /(change|update|edit|wrong)/i,
    reply:
      "You can update your bank details any time from the Bank details page. Refunds already in progress use the details saved when they were initiated.",
  },
  {
    match: /(secure|safe|privacy|encrypt)/i,
    reply:
      "Account numbers are masked on screen and only authorised refund staff can see the full number. Nothing is shown in notifications.",
  },
];

const FALLBACK =
  "Thanks, I've noted that. A refund specialist will follow up in this chat shortly. You can also ask me about timelines or bank details.";

export function getAgentReply(message: string): string {
  return REPLIES.find(({ match }) => match.test(message))?.reply ?? FALLBACK;
}
