import { Query, Resolver, Arg } from "type-graphql";
import Channel from "../entities/Channel";

@Resolver(Channel)
export default class ChannelResolver {
  @Query(() => [Channel]) 
  async channels(@Arg("groupId") groupId: number) {
    return Channel.find({
      where: { group: { id: groupId } },
      relations: { group: true },
    });
  } 

  @Query(() => Channel, { nullable: true })
  async channel(
    @Arg("groupId") groupId: number,
    @Arg("channelId") channelId: number
  ) {
    return Channel.findOne({
      where: { id: channelId, group: { id: groupId } },
      relations: { group: true },
    });
  }
}
