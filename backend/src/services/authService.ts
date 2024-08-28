import crypto from "crypto";

/**
 * Generates a random password with a length of 150 characters.
 */
export function generateRandomPassword(): string {
  const password = crypto.randomBytes(150).toString("hex");
  return password;
}

/**
 * Generates a random token with a length of 32 characters.
 */
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
