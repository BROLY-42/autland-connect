import { describe, it, expect, beforeEach } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import {
  login,
  logout,
  isAuthenticated,
  getCredentials,
  setCredentials,
  validateCredentials,
} from "@/lib/auth";

describe("Security Tests", () => {
  beforeEach(() => {
    // Clear any existing auth state
    logout();
  });

  describe("Password Hashing", () => {
    it("should hash a password", async () => {
      const password = "testpassword";
      const hash = await hashPassword(password);
      expect(hash).toBeDefined();
      expect(typeof hash).toBe("string");
      expect(hash.length).toBeGreaterThan(0);
    });

    it("should verify correct password", async () => {
      const password = "testpassword";
      const hash = await hashPassword(password);
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it("should reject incorrect password", async () => {
      const password = "testpassword";
      const hash = await hashPassword(password);
      const isValid = await verifyPassword("wrongpassword", hash);
      expect(isValid).toBe(false);
    });

    it("should generate different hashes for same password", async () => {
      const password = "testpassword";
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      expect(hash1).not.toBe(hash2); // Due to salt
    });
  });

  describe("Authentication", () => {
    it("should not be authenticated initially", () => {
      expect(isAuthenticated()).toBe(false);
    });

    it("should set and get credentials", async () => {
      const user = "testuser";
      const pass = "testpass";
      await setCredentials(user, pass);
      const creds = getCredentials();
      expect(creds.user).toBe(user);
      expect(creds.pass).toBeDefined();
    });

    it("should validate correct credentials", async () => {
      const user = "testuser";
      const pass = "testpass";
      await setCredentials(user, pass);
      const isValid = await validateCredentials(user, pass);
      expect(isValid).toBe(true);
    });

    it("should reject incorrect credentials", async () => {
      const user = "testuser";
      const pass = "testpass";
      await setCredentials(user, pass);
      const isValid = await validateCredentials(user, "wrongpass");
      expect(isValid).toBe(false);
    });

    it("should login with correct credentials", async () => {
      const user = "testuser";
      const pass = "testpass";
      await setCredentials(user, pass);
      const success = await login(user, pass);
      expect(success).toBe(true);
      expect(isAuthenticated()).toBe(true);
    });

    it("should reject login with incorrect credentials", async () => {
      const user = "testuser";
      const pass = "testpass";
      await setCredentials(user, pass);
      const success = await login(user, "wrongpass");
      expect(success).toBe(false);
      expect(isAuthenticated()).toBe(false);
    });

    it("should logout", async () => {
      const user = "testuser";
      const pass = "testpass";
      await setCredentials(user, pass);
      await login(user, pass);
      expect(isAuthenticated()).toBe(true);
      logout();
      expect(isAuthenticated()).toBe(false);
    });
  });
});
