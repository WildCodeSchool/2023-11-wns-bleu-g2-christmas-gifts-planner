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

@Entity()
@ObjectType()
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Length(1, undefined)
  @Field()
  content: string;

  @Column()
  @Field()
  sent_at:string;

  @ManyToOne(() => User, User => User.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  
  @Field(() => User)
  writtenBy: User;

  
}
