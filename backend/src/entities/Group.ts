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
}
