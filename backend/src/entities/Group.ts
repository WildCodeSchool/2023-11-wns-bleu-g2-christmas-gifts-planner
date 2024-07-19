import { Length } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Channel from "./Channel";
import User from "./User";

/**
 * The Group entity represents a group of users.
 */
@Entity()
@ObjectType()
export default class Group extends BaseEntity {
  /**
   * The unique identifier of the group.
   */
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  /**
   * The name of the group. The name must be between 2 and 50 characters.
   */
  @Column()
  @Length(2, 50)
  @Field()
  name: string;

  /**
   * The owner of the group. The owner is a User entity.
   */
  @ManyToOne(() => User, (user) => user.groups, {
    onDelete: "CASCADE", // Delete the group if the owner is deleted
  })
  @Field(() => User)
  owner: User;

  /**
   * The list of members of the group. A group can have many members.
   * Each member is a User entity.
   */
  @ManyToMany(() => User, (user) => user.memberGroups, {
    eager: true, // Fetch the members when fetching the group
    cascade: true, // Allow operations to be cascaded to related entities
  })
  @JoinTable()
  @Field(() => [User])
  members: User[];
  // The @JoinTable decorator is used to generate a join table with the "Group" and "User" entities.

  @Field(() => [Channel], { nullable: true })
  @OneToMany(() => Channel, (channel) => channel.group)
  channels: Channel[];
}
