import {
  Arg,
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
import { NewMessageInputType } from "../types/NewMessageType";
import { NewLikeType } from "../types/LikeType";

@Resolver(Message)
export default class MessageResolver {
  @Query(() => [Message])
  async messages(
    @Arg("userId", { nullable: true }) id?: number,
    @Arg("channelId", () => Int, { nullable: true }) channelId?: number,
    @Arg("likes", () => Int, { nullable: true }) likedBy?: number
  ) {
    return Message.find({
      relations: { writtenBy: true, channelId: true, likes: true },
      where: {
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
    // newMessage.channelId = data.channelId;
    Object.assign(newMessage, data);
    await newMessage.save();
    await pubsub.publish(`NewMessage_${data.channelId.id}`, newMessage);
    console.log("channel id");
    console.log(data.channelId.id);
    // await pubsub.publish(`NewMessage`, newMessage);

    return newMessage;
  }

  @Subscription(() => Message, {
    topics: ({ args }) => {
      console.log(`NewMessage_${args.channelId}`);
      return `NewMessage_${args.channelId}`;
    },
    // filter: ({ payload, args }) => payload.channelId === args.channelId,
  })
  newMessage(
    @Root() newMessagePayload: Message,
    @Arg("channelId", () => Int) channelId: number
  ): Message {
    return newMessagePayload;
  }
}
