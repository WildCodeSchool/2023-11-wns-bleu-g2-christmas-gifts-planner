import { Query, Resolver, Arg } from "type-graphql";
import Channel from "../entities/Channel";

@Resolver(Channel)
export default class ChannelResolver {
  @Query(() => [Channel]) 
  async channels() {
    return Channel.find({
      relations: { group_id: true },
    });
  } 

  @Query(() => Channel, { nullable: true })
  async channel(@Arg("id") id: number) {
    return Channel.findOne({
      where: { id }, 
      relations: { group_id: true },
    });
  }
}
