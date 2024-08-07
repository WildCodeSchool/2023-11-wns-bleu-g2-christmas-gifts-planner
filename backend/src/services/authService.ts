import crypto from "crypto";

export function generateRandomPassword(): string {
  const password = crypto.randomBytes(150).toString("hex");
  return password;
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
