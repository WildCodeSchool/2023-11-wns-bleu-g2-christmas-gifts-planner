import { buildSchemaSync } from "type-graphql";
import UserResolver from "../resolvers/UserResolver";
import { authChecker } from "../config/auth";
import GroupResolver from "../resolvers/GroupResolver";
import MessageResolver from "../resolvers/MessageResolver";

export default buildSchemaSync({
  resolvers: [UserResolver, GroupResolver,MessageResolver],
  authChecker,
});
