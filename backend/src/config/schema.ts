import { buildSchemaSync } from "type-graphql";
import UserResolver from "../resolvers/UserResolver";
import { authChecker } from "../config/auth";

export default buildSchemaSync({
  resolvers: [UserResolver],
  authChecker,
});
