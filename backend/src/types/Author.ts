import { Field, InputType, Int } from "type-graphql";
import { ObjectId } from "./ObjectIdType";

@InputType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
