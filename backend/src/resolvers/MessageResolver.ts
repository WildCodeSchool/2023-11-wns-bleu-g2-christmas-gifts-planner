import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../config/db";
import User, { hashPassword } from "../entities/User";
import { NewUserInputType } from "../types/NewUserInputType";
import { GraphQLError } from "graphql";
import { LoginInputType } from "../types/LoginInputType";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { ContextType } from "../types/ContextType";
import Message from "../entities/Message";
import { NewMessageInputType } from "../types/NewMessageType";

@Resolver(Message)
export default class MessageResolver {
  @Mutation(() => Message)
  async createMessage(@Arg("data") data: NewMessageInputType): Promise<Message> {

    const newMessage = new Message();
    Object.assign(newMessage, data);
    const newMessageWithId = await newMessage.save();
    return newMessageWithId;

  }

//   @Query(() => [Message])
//   async Message(): Promise<Message[]> {
//     return Message.find();
//   }
  @Query(() => [Message])
  async messages(
    @Arg("userID", { nullable: true }) id?: number,
  ) {
    return Message.find({
      relations: { writtenBy: true,},
      where: {
     
        writtenBy: {
          id:  id,
        },
      },
    });
  }

}
