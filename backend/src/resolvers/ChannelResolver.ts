import { Query } from "type-graphql";
import Channel from "../entities/Channel";

export default class ChannelResolver {
  @Query(() => [Channel])
  async channels() {
    return Channel.find({
      relations: { group_id: true },
    });
  }
}
