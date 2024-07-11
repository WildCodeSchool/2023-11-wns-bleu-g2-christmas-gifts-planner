import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ObjectId } from "./ObjectIdType";

@InputType()
export class NewGroupInputType {
  @Field()
  @MinLength(3)
  name: string;

  @Field(() => [ObjectId], { nullable: true })
  members?: ObjectId[];
}
