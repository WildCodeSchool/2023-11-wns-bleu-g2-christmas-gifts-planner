import { buildSchemaSync } from "type-graphql";
import UserResolver from "../resolvers/UserResolver";
import { authChecker } from "../config/auth";
import GroupResolver from "../resolvers/GroupResolver";

export default buildSchemaSync({
  resolvers: [UserResolver, GroupResolver],
  authChecker,
});
