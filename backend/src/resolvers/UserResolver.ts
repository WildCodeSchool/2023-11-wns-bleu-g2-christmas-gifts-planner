import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../config/db";
import User, { hashPassword, verifyPassword } from "../entities/User";
import { NewUserInputType } from "../types/NewUserInputType";
import { UpdateUserInputType } from "../types/UpdateUserInputType"
import { GraphQLError } from "graphql";
import { LoginInputType } from "../types/LoginInputType";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { ContextType } from "../types/ContextType";

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
  } catch (error: string){
    console.error('Error creating user:', error);
    throw new GraphQLError("une erreur est survenue")
  }

  @Mutation(() => User)
  async updateUser(@Arg("data") data: UpdateUserInputType, @Arg("userId") userId: string): Promise<User> {
    try {
      const existingUser = await User.findOneBy({ id: parseInt(userId) });
      if (!existingUser) throw new GraphQLError("USER_NOT_FOUND");
      console.log('I RECEIVE: ', data);
      
      if (data.email && data.email !== existingUser.email) {
        const emailInUse = await User.findOneBy({ email: data.email });
        if (emailInUse) throw new GraphQLError("EMAIL_ALREADY_TAKEN");
        existingUser.email = data.email;
      }
  
      if (data.oldPassword !== undefined) {
        const isOldPasswordValid = await verifyPassword(existingUser.hashedPassword, data.oldPassword);
        
        if (!isOldPasswordValid) alert("INVALID OLD PASSWORD");
  
        if (data.newPassword && isOldPasswordValid) {
          existingUser.password = await hashPassword(data.newPassword);
        }
      }
  
      if (data.firstName) existingUser.firstName = data.firstName;
      if (data.lastName) existingUser.lastName = data.lastName;
  
      const updatedUser = await existingUser.save();
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new GraphQLError("une erreur est survenue");
    }
  }
  @Mutation(() => String)
  async login(@Arg("data") data: LoginInputType, @Ctx() ctx: ContextType) {
    const existingUser = await User.findOneBy({ email: data.email });

    if (existingUser === null) throw new GraphQLError("Invalid Credentials");
    const passwordVerified = await verify(
      existingUser.hashedPassword,
      data.password
    );

    if (!passwordVerified) throw new GraphQLError("Invalid Password");
    const token = jwt.sign(
      {
        userId: existingUser.id,
      },
      env.JWT_PRIVATE_KEY,
      { expiresIn: "30d" }
    );
    ctx.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "production",
    });

    return token;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType) {
    if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");
    return User.findOneOrFail({
      where: { id: ctx.currentUser.id },
    });
  }
  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType) {
    ctx.res.clearCookie("token");
    return "ok";
  }
}
