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
import Group from "./Group";
import Message from "./Message";
import Like from "./Like";
import User from "./User";
@Entity()
@ObjectType()
export default class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Length(2, 50)
  @Field()
  name: string;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.channels)
  group: Group;

  @OneToMany(() => Message, (message) => message, { cascade: true })
  messages: Message[];

  @OneToMany(() => Like, (like) => like, { cascade: true })
  likes: Like[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user, { cascade: true })
  receiver: User;


}
