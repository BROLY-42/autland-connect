// Secure password hashing using Web Crypto API with PBKDF2
// Note: For production, server-side hashing with bcrypt or argon2 is recommended

const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 256;

const generateSalt = (): Uint8Array => {
  return crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
};

const arrayBufferToHex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const hexToArrayBuffer = (hex: string): ArrayBuffer => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes.buffer;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = generateSalt();
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt.buffer,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_LENGTH
  );

  const saltHex = arrayBufferToHex(salt.buffer);
  const hashHex = arrayBufferToHex(hashBuffer);

  return `${saltHex}:${hashHex}`;
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const [saltHex, hashHex] = hash.split(":");
  if (!saltHex || !hashHex) return false;

  const salt = hexToArrayBuffer(saltHex);
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derivedHashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_LENGTH
  );

  const derivedHashHex = arrayBufferToHex(derivedHashBuffer);
  return hashHex === derivedHashHex;
};
