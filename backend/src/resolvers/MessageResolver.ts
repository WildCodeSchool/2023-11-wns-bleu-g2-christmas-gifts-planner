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
      relations: { writtenBy: true, channel: true },
      where: {
        writtenBy: {
          id: id,
        },
        channel: {
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
    Object.assign(newMessage, data);
    await newMessage.save();
    await pubsub.publish("NewMessage", newMessage);
    return newMessage;
  }

  @Subscription({ topics: "NewMessage" })
  newMessage(@Root() newMessagePayload: Message): Message {
    return newMessagePayload;
  }
}
