import { argon2id, hash, verify } from "argon2";
import { IsEmail, Matches, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;
  
    @Column()
    @Field()
    firstName: string;
  
    @Column()
    @Field()
    lastName: string;
  
    @Column()
    @Field()
    email: string;

    @Column()
    hashedPassword: string;
}

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  password: string;

  @Field()
  @MinLength(3)
  nickname: string;
}
const hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2id,
  };
  
  export const hashPassword = async (plainPassword: string): Promise<string> =>
    await hash(plainPassword, hashingOptions);
  
  export const verifyPassword = async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> =>
    await verify(hashedPassword, plainPassword, {secret: hashingOptions});

    // export const getSafeAttributes = (user: User): User =>
    //     ({
    //       ...user,
    //       hashedPassword: undefined,
    //     } as User);