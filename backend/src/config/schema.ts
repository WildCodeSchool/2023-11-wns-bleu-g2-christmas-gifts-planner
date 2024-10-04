import { buildSchemaSync } from "type-graphql";
import UserResolver from "../resolvers/UserResolver";
import { authChecker } from "../config/auth";
import GroupResolver from "../resolvers/GroupResolver";
import MemberResolver from "../resolvers/MemberResolver";
import ChannelResolver from "../resolvers/ChannelResolver";
import MessageResolver from "../resolvers/MessageResolver";
import LikeResolver from "../resolvers/LikeResolver";

export default buildSchemaSync({
  resolvers: [
    UserResolver,
    GroupResolver,
    MemberResolver,
    ChannelResolver,
    MessageResolver,
    LikeResolver,
  ],
  authChecker,
});
