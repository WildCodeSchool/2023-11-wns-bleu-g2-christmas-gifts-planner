import { argon2id, hash, verify } from "argon2";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Group from "./Group";

export enum UserRole {
  Admin = "admin",
  Visitor = "visitor",
}

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.hashedPassword = await hash(this.password);
  }

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  hashedPassword: string;

  @Field()
  @Column({ enum: UserRole, default: UserRole.Visitor })
  role: UserRole;

  /**
   * The list of groups the user owns.
   */
  @OneToMany(() => Group, (group) => group.owner)
  @Field(() => [Group], { nullable: true })
  groups: Group[];

  /**
   * The list of groups the user is a member of.
   */
  @ManyToMany(() => Group, (group) => group.members)
  @Field(() => [Group], { nullable: true })
  memberGroups: Group[];
}

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2id,
};

export const hashPassword = async (plainPassword: string): Promise<string> =>
  await hash(plainPassword, hashingOptions);

export const verifyPassword = async (
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  try {
    return await verify(hashedPassword, plainPassword);
  } catch (error) {
    console.error("Error in verifyPassword:", error);
    throw new Error("Error verifying password");
  }
};

// export const getSafeAttributes = (user: User): User =>
//     ({
//       ...user,
//       hashedPassword: undefined,
//     } as User);
