import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../config/db";
import User, { hashPassword, verifyPassword } from "../entities/User";
import {
  CompleteProfileInputType,
  LoginInputType,
  NewUserInputType,
  UpdateUserInputType,
} from "../types/UserTypes";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { ContextType } from "../types/ContextType";

/**
 * Resolver class for handling user-related operations.
 */
@Resolver(User)
export default class UserResolver {
  /**
   * Mutation resolver for creating a new user.
   */
  @Mutation(() => User)
  async createUser(
    @Arg("data", { validate: true }) data: NewUserInputType
  ): Promise<User> {
    // Check if the email is already taken.
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN");

    // create a new user with the provided data
    const newUser = new User();
    Object.assign(newUser, data);
    const newUserWithId = await newUser.save();
    return newUserWithId;
  }
  catch(error: string) {
    console.error("Error creating user:", error);
    throw new GraphQLError("Error creating user: " + error);
  }

  /**
   * Complete a user's profile with the provided data.
   */
  @Mutation(() => String)
  async completeProfile(
    @Arg("token") token: string,
    @Arg("data", { validate: true }) data: CompleteProfileInputType,
    @Ctx() ctx: ContextType
  ) {
    try {
      // Find the user by the verification token.
      const user = await User.findOneBy({ verificationToken: token });

      // Check if the token is valid and if the user has a temporary password.
      if (!user || !user.temporaryPassword)
        throw new GraphQLError("Invalid or expired token");

      // Check if the email is provided and if it's different from the user's current email.
      if (data.email && user.email !== data.email) {
        const emailExists = await User.findOneBy({ email: data.email });
        if (emailExists) throw new GraphQLError("This email is already taken");
        user.email = data.email;
      }

      // Update the user's profile with the provided data.
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.hashedPassword = await hashPassword(data.password);

      // Reset the verification token and temporary password.
      user.verificationToken = null;
      user.temporaryPassword = false;

      await user.save();

      // Generate a new JWT token.
      const newToken = jwt.sign(
        {
          userId: user.id,
        },
        env.JWT_PRIVATE_KEY,
        { expiresIn: "30d" }
      );

      // Set the new token in the response cookie.
      ctx.res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: env.NODE_ENV === "production",
      });

      // Return the new token.
      return newToken;
    } catch (error: any) {
      console.error("Error completing profile:", error);
      throw new GraphQLError("An error occurred while completing your profile");
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("data") data: UpdateUserInputType,
    @Arg("userId") userId: string
  ): Promise<User> {
    try {
      const existingUser = await User.findOneById(userId);
      if (!existingUser) throw new GraphQLError("USER_NOT_FOUND");

      if (data.oldPassword !== "" && data.newPassword !== "") {
        const isOldPasswordValid = await verifyPassword(
          existingUser.hashedPassword,
          data.oldPassword!
        );
        if (!isOldPasswordValid) throw new GraphQLError("INVALID_OLD_PASSWORD");

        existingUser.hashedPassword = await hashPassword(data.newPassword!);
      }

      if (data.firstName) existingUser.firstName = data.firstName;
      if (data.lastName) existingUser.lastName = data.lastName;
      if (data.email) existingUser.email = data.email;

      const updatedUser = await existingUser.save();
      return updatedUser;
    } catch (error: any) {
      console.error("Error updating user:", error.message);
      throw new GraphQLError(error.message);
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
  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType) {
    if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");
    return User.findOneOrFail({
      where: { id: ctx.currentUser.id },
      relations: { groups: true, memberGroups: true },
    });
  }
  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType) {
    ctx.res.clearCookie("token");
    return "ok";
  }
}
