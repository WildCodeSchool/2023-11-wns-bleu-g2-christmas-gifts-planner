import { IsEmail, Matches, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import User, { UserRole } from "../entities/User";
import Message from "../entities/Message";
import { ObjectId } from "./ObjectIdType";
import { Author } from "./Author";



@InputType()
export class NewMessageInputType {
  @Field()
  content: string;

  @Field()
  sent_at: string;

  @Field(() => Author)
  writtenBy: Author;
}
