import { IsEmail, Matches, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewUserInputType {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  password: string;

  @Field()
  @MinLength(3)
  lastName: string;

  @Field()
  @MinLength(3)
  firstName: string;


}
