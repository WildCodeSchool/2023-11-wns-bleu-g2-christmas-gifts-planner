import { load } from "ts-dotenv";

export default load({
  DB_HOST: String,
  DB_PORT: Number,
  DB_USER: String,
  DB_PASS: String,
  DB_NAME: String,
  SERVER_PORT: Number,
  CORS_ALLOWED_ORIGINS: String,
  JWT_PRIVATE_KEY: String,
  NODE_ENV: String,
});
