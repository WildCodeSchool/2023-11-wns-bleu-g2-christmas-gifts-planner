import { Query, Resolver, Arg, Ctx, Authorized, Mutation } from "type-graphql";
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

    // Fetch the channels with the receiver relation included
    const channels = await Channel.find({
      where: { group: { id: groupId } },
      relations: { group: true, receiver: true }, 
    });

    //Check if the current user is the receiver of the channel
     const filteredChannels = channels.filter(
      (channel) => channel.receiver.id !== ctx.currentUser?.id
    );

    return filteredChannels;
  }

  @Query(() => Channel, { nullable: true })
  async channel(
    @Arg("groupId") groupId: number,
    @Arg("channelId") channelId: number,
    @Ctx() ctx: ContextType
  ) {
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in!");
    }
  
    const channel = await Channel.findOne({
      where: { id: channelId, group: { id: groupId } },
      relations: { group: true, receiver: true },
    });
  
    if (!channel) {
      throw new GraphQLError("Channel not found");
    }
  
    // Check if the current user is the receiver of this channel
    if (channel.receiver.id === ctx.currentUser.id) {
      throw new GraphQLError("You cannot access your own channel");
    }
  
    return channel;
  }
      @Authorized()
    @Mutation(() => [Channel])
    async createChannels(
      @Arg("groupId") groupId: number,
      @Ctx() ctx: ContextType
    ): Promise<Channel[]> {
      // Checking if the user is logged in
      if (!ctx.currentUser) {
        throw new GraphQLError("You need to be logged in!");
      }
  
      // Get group by ID ant its members
      const group = await Group.findOne({
        where: { id: groupId },
        relations: { members: true, owner: true },
      });
  
      if (!group) {
        throw new GraphQLError("Group not found");
      }
  
      // Check if the current user is a member of the group or an owner
      const isMember = group.members.some(
        (member) => member.id === ctx.currentUser?.id
      );
      const isOwner = group.owner.id === ctx.currentUser?.id;
  
      if (!isMember && !isOwner) {
        throw new GraphQLError("You are not a member of this group");
      }
  
      const channels: Channel[] = [];
      // Creation of a channel for each member of the group
      for (const member of group.members) {
        const newChannel = Channel.create({
          name: `Channel for ${member.firstName} ${member.lastName}`,
          group: group, 
          receiver: member, 
        });
  
        // Save the channel in the database
        await newChannel.save();
        channels.push(newChannel); 
      }

      const ownerChannel = Channel.create({
        name: `Channel for ${group.owner.firstName} ${group.owner.lastName}`,
        group: group, 
        receiver: group.owner, 
      });
    
      // Save the channel of the owner in the database
      await ownerChannel.save();
      channels.push(ownerChannel);
      // return the created channels
      return channels; 
    }
  
}
