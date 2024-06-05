import db from "../../backend/src/config/db";

export async function connect() {
  await db.initialize();
}

export async function disconnect() {
  await db.destroy();
}