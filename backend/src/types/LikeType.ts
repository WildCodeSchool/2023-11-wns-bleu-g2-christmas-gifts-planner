import { Field, InputType } from "type-graphql";
import { ObjectId } from "./ObjectIdType";

@InputType()
export class NewLikeType {
  @Field(() => ObjectId)
  LikedBy: ObjectId;

  @Field(() => ObjectId)
  likedMessageId: ObjectId;
}
