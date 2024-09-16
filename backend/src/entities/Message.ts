import { Length } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Channel from "./Channel";
import Like from "./Like";

@Entity()
@ObjectType()
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Length(1, undefined)
  @Column()
  @Field()
  content: string;

  @Column()
  @Field()
  sent_at: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => User)
  writtenBy: User;

  @ManyToOne(() => Channel, (channel) => channel.id, {
    onDelete: "CASCADE",
  })
  @Field(() => Channel)
  channelId: Channel;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.likedMessageId)
  likes: Like[];
}
