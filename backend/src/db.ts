import { DataSource } from "typeorm";
import env from "./env";
import UserResolver from "./resolvers/UserResolver";

export default new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [UserResolver],
  synchronize: true,
});
