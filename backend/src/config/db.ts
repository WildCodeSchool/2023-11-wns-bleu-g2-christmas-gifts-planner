import { DataSource } from "typeorm";
import env from "../env";
import User from "../entities/User";
import Group from "../entities/Group";
import Message from "../entities/Message";
import Channel from "../entities/Channel";
import Like from "../entities/Like";

const db = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [User, Group, Channel, Message, Like],
  synchronize: true,
  logging: env.NODE_ENV !== "test",
});

export async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities
    .map((entity) => `"${entity.tableName}"`)
    .join(", ");
  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;
