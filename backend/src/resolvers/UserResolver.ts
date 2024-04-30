import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, { UserInput, hashPassword } from "../entities/User";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("data", { validate: true }) data: UserInput
  ): Promise<User> {
    const exisitingUser = await User.findOne({ where: { email: data.email } });
    if (exisitingUser !== null) throw new Error("EMAIL_ALREADY_EXISTS");
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
