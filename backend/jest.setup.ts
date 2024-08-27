import { ASTNode, graphql, GraphQLSchema, print } from "graphql";

import db, { clearDB } from "./src/config/db";
import getSchema from "./src/config/schema";
import { Maybe } from "type-graphql";
import nodemailer from "nodemailer";
import env from "../backend/src/env";

export let schema: GraphQLSchema;
let transporter: nodemailer.Transporter;

export async function execute(
  operation: ASTNode,
  variableValues?: Maybe<{
    readonly [variable: string]: unknown;
  }>,
  contextValue = {}
) {
  return await graphql({
    schema,
    source: print(operation),
    variableValues,
    contextValue,
  });
}

beforeAll(async () => {
  await db.initialize();
  schema = await getSchema;

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });
});

beforeEach(async () => {
  await clearDB();
});

afterAll(async () => {
  try {
    if (transporter) {
      transporter.close();
    }
  } catch (error) {
    console.error("Error closing transporter: ", error);
  }
  await db.destroy();
});
