import { Field, InputType } from "type-graphql";
import { Author } from "./Author";
import { ObjectId } from "./ObjectIdType";

@InputType()
export class NewMessageInputType {
  @Field()
  content: string;

  @Field()
  sent_at: string;

  @Field(() => Author)
  writtenBy: Author;

  @Field(() => ObjectId)
  channelId: ObjectId;
}
