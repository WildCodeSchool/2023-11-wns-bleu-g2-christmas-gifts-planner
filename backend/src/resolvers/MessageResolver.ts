import { GraphQLError } from "graphql";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import Message from "../entities/Message";
import { ContextType } from "../types/ContextType";
import { NewMessageInputType } from "../types/NewMessageType";
import ChannelResolver from "./ChannelResolver";
import User from "../entities/User";
import Channel from "../entities/Channel";
import Group from "../entities/Group";

@Resolver(Message)
export default class MessageResolver extends ChannelResolver {
  @Authorized()
  @Query(() => [Message])
  async messages(
    @Arg("groupId", { nullable: true }) groupId: number,
    @Arg("userId", { nullable: true }) id?: number,
    @Arg("channelId", () => Int, { nullable: true }) channelId?: number,
    @Arg("likes", () => Int, { nullable: true }) likedBy?: number,
    @Ctx() ctx?: ContextType
  ) {
    if (!ctx?.currentUser) {
      throw new GraphQLError("You need to be logged in!");
    }

    const currentGroup = await Group.findOne({
      where: { id: groupId },
    });
    const currentChannel = await Channel.findOne({
      where: { id: channelId },
      relations: { group: true, receiver: true },
    });
    const isMember = currentGroup?.members.some(
      (member) => member.id === ctx.currentUser?.id
    );
    console.log("isMember", currentGroup?.members);
    const isOwner = currentGroup?.owner.id === ctx.currentUser?.id;
    console.log("isOwner", isOwner);

    console.log("memebrs test", currentGroup);
    if (
      (!isMember && !isOwner) || // Check if the user is neither a member nor the owner
      ctx?.currentUser.id === currentChannel?.receiver.id // Check if the user is the receiver
    ) {
      throw new GraphQLError(
        "Oh oh, looks like you don't belong to this channel!"
      );
    }
    console.log("reciverID", currentChannel?.receiver.id);
    // console.log("currentGroup", currentG?.members);
    console.log("currentChannel-reciver", currentChannel?.receiver.id);
    console.log("currentChannel-mmebers", currentChannel?.group.members);

    // console.log("currentUser", ctx?.currentUser?.channels);

    return Message.find({
      relations: {
        writtenBy: true,
        channelId: true,
        likes: true,
        groupId: true,
      },
      where: {
        groupId: {
          id: groupId,
        },
        writtenBy: {
          id: id,
        },
        channelId: {
          id: channelId,
        },
        likes: {
          id: likedBy,
        },
      },
    });
  }

  @Mutation(() => Message)
  async createMessage(
    @Arg("data") data: NewMessageInputType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Message> {
    const newMessage = new Message();
    newMessage.sent_at = String(new Date());
    Object.assign(newMessage, data);
    await newMessage.save();
    await pubsub.publish(`NewMessage_${data.channelId.id}`, newMessage);

    return newMessage;
  }

  @Subscription(() => Message, {
    topics: ({ args }) => {
      console.log(`NewMessage_${args.channelId}`);
      return `NewMessage_${args.channelId}`;
    },
  })
  newMessage(
    @Root() newMessagePayload: Message,
    @Arg("channelId", () => Int) channelId: number,
    @Arg("groupId", () => Int) groupId: number
  ): Message {
    return newMessagePayload;
  }
}
