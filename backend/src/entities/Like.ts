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

@Entity()
@ObjectType()
export default class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => User)
  LikedBy: User;

  @ManyToOne(() => Message, (Message) => Message.id, {
    onDelete: "CASCADE",
  })
  @Field(() => Message)
  likedMessageId: Message;

  @ManyToOne(() => Channel, (channel) => channel.id, {
    onDelete: "CASCADE",
  })
  @Field(() => Message)
  channelId: Message;
}
