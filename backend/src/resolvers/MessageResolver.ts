import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription ,PubSub, PubSubEngine} from "type-graphql";
import Message from "../entities/Message";
import { NewMessageInputType } from "../types/NewMessageType";
import { AfterInsert, InsertEvent } from "typeorm";
import User from "../entities/User";

@Resolver(Message)
export default class MessageResolver {






    @Query(() => [Message])
    async messages(
      @Arg("userId", { nullable: true }) id?: number,
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
    
    @Mutation(() => Message)
    async createMessage(
      @Arg('data') data: NewMessageInputType,
      @PubSub() pubsub: PubSubEngine,
    ): Promise<Message> {
      const newMessage = new Message();
      Object.assign(newMessage, data);
      await newMessage.save(); 
      await pubsub.publish('NewMessage', newMessage); 
      return newMessage;
    }
    
    @Subscription({ topics: 'NewMessage' })
    newMessage(@Root() newMessagePayload: Message): Message {
      return newMessagePayload;
    }

    
      //  ----------------------------------------------------------------------
  //  ---------------------------------------------------------------------- 
  //  ---------------------------------------------------------------------- 

  // @Mutation(() => Message)
  // async createMessage(@Arg("data") data: NewMessageInputType): Promise<Message> {
  
  //   const newMessage = new Message();
  //   Object.assign(newMessage, data);
  //   const newMessageWithId = await newMessage.save();
  //   return newMessageWithId;
  
  // }
          //  ----------------------------------------------------------------------
  //  ---------------------------------------------------------------------- 
  //  ---------------------------------------------------------------------- 

  
  
}
