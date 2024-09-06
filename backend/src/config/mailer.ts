import nodemailer from "nodemailer";
import env from "../env";

export default nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465 ? true : false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // ignore self-signed certificates (for testing)
  },
  logger: true, // log information in console
  debug: true, // include SMTP traffic in the logs
  connectionTimeout: 5 * 60 * 1000, // 5 minutes
  socketTimeout: 5 * 60 * 1000, // 5 minutes
});
