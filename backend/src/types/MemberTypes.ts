import { IsEmail, ValidateNested } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class EmailInputType {
  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class AddMembersInputType {
  @Field(() => [EmailInputType])
  @ValidateNested({ each: true })
  members: EmailInputType[];
}
