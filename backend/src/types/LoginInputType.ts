import { IsEmail, IsStrongPassword } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInputType {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
