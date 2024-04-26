import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { argon2id, hash, verify } from "argon2";

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
