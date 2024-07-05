import { buildSchemaSync } from "type-graphql";
import UserResolver from "../resolvers/UserResolver";
import { authChecker } from "../config/auth";
import GroupResolver from "../resolvers/GroupResolver";
import ChannelResolver from "../resolvers/ChannelResolver";

export default buildSchemaSync({
  resolvers: [UserResolver, GroupResolver, ChannelResolver],
  authChecker,
});
