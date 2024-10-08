import { IsEmail, Length, Matches, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewUserInputType {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @Matches(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>+=-]).{8,}/
  )
  password: string;

  @Field()
  @Length(2, 30)
  lastName: string;

  @Field()
  @Length(2, 30)
  firstName: string;
}

@InputType()
export class CompleteProfileInputType {
  @Field()
  @Length(2, 30)
  lastName: string;

  @Field()
  @Length(2, 30)
  firstName: string;

  @Field()
  @MinLength(8)
  @Matches(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>+=-]).{8,}/
  )
  password: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;
}

@InputType()
export class LoginInputType {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

@InputType()
export class UpdateUserInputType {
  @Field()
  @IsEmail()
  email?: string;

  @Field()
  @Length(2, 30)
  firstName?: string;

  @Field()
  @Length(2, 30)
  lastName?: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  newPassword?: string;

  @Field()
  oldPassword?: string;
}
