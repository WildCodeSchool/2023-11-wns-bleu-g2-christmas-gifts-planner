import { Field, InputType, Int } from "type-graphql";

/**
 * The ObjectId type represents an object identifier.
 * It is used to uniquely identify objects in the database.
 */
@InputType()
export class ObjectId {
  @Field(() => Int)
  id!: number; // Note the exclamation mark: this field is required
}
