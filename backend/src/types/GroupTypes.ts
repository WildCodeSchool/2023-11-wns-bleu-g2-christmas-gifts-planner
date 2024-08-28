import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewGroupInputType {
  @Field()
  @Length(2, 50)
  name: string;

  @Field(() => [String], { nullable: true })
  members?: string[];
}

@InputType()
export class UpdateGroupNameInputType {
  @Field()
  @Length(2, 50)
  name: string;
}
