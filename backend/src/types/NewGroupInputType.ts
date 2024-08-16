import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewGroupInputType {
  @Field()
  @MinLength(3)
  name: string;

  @Field(() => [String], { nullable: true })
  members?: string[];
}
