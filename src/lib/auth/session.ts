export interface SessionUser {
  name: string;
  email: string;
}

export const SESSION_KEY = "refund-bank:session";
export const USERS_KEY = "refund-bank:users";
export const SESSION_EVENT = "refund-bank:session-change";

export function parseSession(raw: string | null | undefined): SessionUser | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<SessionUser>;
    return typeof value.name === "string" && typeof value.email === "string"
      ? { name: value.name, email: value.email }
      : null;
  } catch {
    return null;
  }
}

/** "alex.morgan@mail.com" becomes "Alex Morgan". Used when a person signs in without having registered here. */
export function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const words = local.split(/[._-]+/).filter(Boolean);
  if (words.length === 0) return "Customer";
  return words.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

const readUsers = (storage: Storage): Record<string, string> => {
  try {
    return JSON.parse(storage.getItem(USERS_KEY) ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
};

const announce = () => window.dispatchEvent(new Event(SESSION_EVENT));

/** Demo registration: remembers the display name for an email. Passwords are never stored. */
export function registerUser(name: string, email: string, storage: Storage): SessionUser {
  const key = email.toLowerCase();
  storage.setItem(USERS_KEY, JSON.stringify({ ...readUsers(storage), [key]: name }));
  return startSession({ name, email: key }, storage);
}

export function signIn(email: string, storage: Storage): SessionUser {
  const key = email.toLowerCase();
  return startSession({ name: readUsers(storage)[key] ?? nameFromEmail(key), email: key }, storage);
}

function startSession(user: SessionUser, storage: Storage): SessionUser {
  storage.setItem(SESSION_KEY, JSON.stringify(user));
  announce();
  return user;
}

export function signOut(storage: Storage): void {
  storage.removeItem(SESSION_KEY);
  announce();
}
