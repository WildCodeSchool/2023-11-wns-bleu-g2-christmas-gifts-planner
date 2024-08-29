import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
  PubSub,
  PubSubEngine,
  Int,
} from "type-graphql";
import Message from "../entities/Message";
import { NewMessageInputType } from "../types/NewMessageType";
import { AfterInsert, InsertEvent } from "typeorm";
import User from "../entities/User";
import { ObjectId } from "../types/ObjectIdType";

@Resolver(Message)
export default class MessageResolver {
  @Query(() => [Message])
  async messages(
    @Arg("userId", { nullable: true }) id?: number,
    @Arg("channelId", () => Int, { nullable: true }) channelId?: number
  ) {
    return Message.find({
      relations: { writtenBy: true, channelId: true },
      where: {
        writtenBy: {
          id: id,
        },
        channelId: {
          id: channelId,
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

  // @Subscription(() => NewMessageInputType, {
  //   topics: ({ args }) => `NewMessage_${args.channelId}`, // Dynamically choose the topic based on channelId
  //   // filter: ({ payload, args }) => payload.channelId === args.channelId, // Ensure only messages for the correct channel are sent
  // })
  // newMessage(
  //   @Root() newMessagePayload: NewMessageInputType,
  //   @Arg("channelId") channelId: number // Subscribe based on channelId
  // ): NewMessageInputType {
  //   return newMessagePayload;
  // }

  // @Subscription({ topics: "NewMessage" })
  // newMessage(@Root() newMessagePayload: Message): Message {
  //   return newMessagePayload;
  // }

  //   @Subscription(topics: ({ args, context }) => args.topic )
  // newMessage(@Root() newMessagePayload: Message): Message {
  //   return newMessagePayload;
  // }

  // @Subscription(() => Message, {
  //   topics: ({ args }) => `NewMessage_${args.channelId}`,
  //   // filter: ({ payload, args }) => payload.channelId === args.channelId,
  // })
  // newMessage(
  //   @Root() newMessageRecived: Message,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   @Arg("channelId", () => Int) channelId: number
  // ): Message {
  //   return newMessageRecived;
  // }

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
