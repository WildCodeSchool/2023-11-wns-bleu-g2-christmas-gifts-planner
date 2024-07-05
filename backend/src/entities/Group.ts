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

@Entity()
@ObjectType()
export default class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Length(2, 50)
  @Field()
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.groups)
  owner: User;

  @Field(() => [Channel], { nullable: true })
  @OneToMany(() => Channel, (channel) => channel.group_id)
  channels: Channel[];
}
