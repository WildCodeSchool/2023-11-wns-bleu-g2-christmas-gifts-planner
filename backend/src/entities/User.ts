import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";


@Entity()
@ObjectType()
export class User extends BaseEntity{
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