import { hashPassword, verifyPassword } from "./crypto";

const AUTH_KEY = "admin_auth_v1";
const CREDENTIALS_KEY = "admin_creds_v1";
const DEFAULT_USER = "admin";
// Default password hash will be generated on first use
let DEFAULT_PASS_HASH: string | null = null;

const getDefaultPassHash = async (): Promise<string> => {
  if (!DEFAULT_PASS_HASH) {
    DEFAULT_PASS_HASH = await hashPassword("1205051001");
  }
  return DEFAULT_PASS_HASH;
};

interface Credentials {
  user: string;
  passHash: string;
}

const getStoredCredentials = (): Credentials | null => {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn("Failed to read stored credentials:", e);
    return null;
  }
};

const saveCredentials = (credentials: Credentials): void => {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
  } catch (e) {
    console.error("Failed to save credentials:", e);
    throw new Error("Unable to save credentials");
  }
};

export const getCredentials = (): { user: string; pass: string } => {
  const stored = getStoredCredentials();
  if (stored) {
    return { user: stored.user, pass: "" }; // Don't expose password hash
  }
  return { user: DEFAULT_USER, pass: "" };
};

export const setCredentials = async (
  user: string,
  pass: string
): Promise<void> => {
  if (!user?.trim()) {
    throw new Error("Username cannot be empty");
  }
  if (!pass?.trim()) {
    throw new Error("Password cannot be empty");
  }

  const passHash = await hashPassword(pass);
  saveCredentials({ user: user.trim(), passHash });
};

export const login = async (
  username: string,
  password: string
): Promise<boolean> => {
  if (!username?.trim() || !password?.trim()) {
    return false;
  }

  const stored = getStoredCredentials();
  const defaultHash = await getDefaultPassHash();
  const creds = stored || { user: DEFAULT_USER, passHash: defaultHash };

  const isValid =
    username === creds.user && (await verifyPassword(password, creds.passHash));
  if (isValid) {
    try {
      localStorage.setItem(AUTH_KEY, "true");
    } catch (e) {
      console.error("Failed to set auth state:", e);
      return false;
    }
  }
  return isValid;
};

export const logout = (): void => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error("Failed to logout:", e);
  }
};

export const isAuthenticated = (): boolean => {
  try {
    return localStorage.getItem(AUTH_KEY) === "true";
  } catch (e) {
    console.warn("Failed to check auth state:", e);
    return false;
  }
};

export const validateCredentials = async (
  user: string,
  currentPass: string
): Promise<boolean> => {
  if (!user?.trim() || !currentPass?.trim()) {
    return false;
  }

  const stored = getStoredCredentials();
  const defaultHash = await getDefaultPassHash();
  const creds = stored || { user: DEFAULT_USER, passHash: defaultHash };

  return (
    user === creds.user && (await verifyPassword(currentPass, creds.passHash))
  );
};

export default {
  login,
  logout,
  isAuthenticated,
  getCredentials,
  setCredentials,
  validateCredentials,
};
