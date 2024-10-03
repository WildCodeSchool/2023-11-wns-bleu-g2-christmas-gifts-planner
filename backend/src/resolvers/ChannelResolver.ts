import { Query, Resolver, Arg, Ctx, Authorized } from "type-graphql";
import Channel from "../entities/Channel";
import { ContextType } from "../types/ContextType";
import { GraphQLError } from "graphql";
import Group from "../entities/Group";

@Resolver(Channel)
export default class ChannelResolver {
  @Authorized()
  @Query(() => [Channel])
  async channels(@Arg("groupId") groupId: number, @Ctx() ctx: ContextType) {
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in!");
    }

    const group = await Group.findOne({
      where: { id: groupId },
      relations: { members: true },
    });
    if (!group) {
      throw new GraphQLError("Group not found");
    }

    const isMember = group.members.some(
      (member) => member.id === ctx.currentUser?.id
    );
    const isOwner = group.owner.id === ctx.currentUser?.id;

    if (!isMember && !isOwner) {
      throw new GraphQLError("You are not a member of this group");
    }

    const channels = await Channel.find({
      where: { group: { id: groupId } },
      relations: { group: true },
    });

    return channels;
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
