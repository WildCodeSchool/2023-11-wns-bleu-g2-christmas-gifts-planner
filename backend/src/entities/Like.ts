import { Length } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Channel from "./Channel";
import Message from "./Message";
import Group from "./Group";

@Entity()
@ObjectType()
export default class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: true })
  id: number;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => User, { nullable: true })
  LikedBy: User;

  @ManyToOne(() => Message, (Message) => Message.id, {
    onDelete: "CASCADE",
  })
  @Field(() => Message, { nullable: true })
  likedMessageId: Message;

  @ManyToOne(() => Channel, (channel) => channel.id, {
    onDelete: "CASCADE",
  })
  @Field(() => Channel, { nullable: true })
  channelId: Channel;

  @ManyToOne(() => Group, (group) => group.id, {
    onDelete: "CASCADE",
  })
  @Field(() => Group, { nullable: true })
  groupId: Group;
}
