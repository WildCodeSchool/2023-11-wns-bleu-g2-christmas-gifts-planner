import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, { hashPassword } from "../entities/User";
import { NewUserInputType } from "../types/NewUserInputType";
import { GraphQLError } from "graphql";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: NewUserInputType): Promise<User> {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN");

    const newUser = new User();
    Object.assign(newUser, data);
    const newUserWithId = await newUser.save();
    return newUserWithId;

    const hashedPassword = await hashPassword(data.password);
    return await datasource
      .getRepository(User)
      .save({ ...data, hashedPassword });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }
}
