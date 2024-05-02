import { buildSchemaSync } from "type-graphql";
import UserResolver from "../resolvers/UserResolver";

export default buildSchemaSync({
  resolvers: [UserResolver],
});
