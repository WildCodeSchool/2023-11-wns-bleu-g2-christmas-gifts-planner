import User from "../entities/User";
import { sendInvitationEmail } from "./emailService";

/**
 * Finds a user by their email.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return await User.findOneBy({ email });
}

/**
 * Finds a user by their email, creating a new user if one does not exist.
 */
export async function findOrCreateUserByEmail(
  email: string,
  groupName: string
): Promise<User> {
  // Find the user by their email
  let user = await findUserByEmail(email);

  // If the user doesn't exist, create a new user
  if (!user) {
    user = new User();
    user.email = email;
    user.password = "passwordtest";
    await user.save();
    console.log(`User with email ${email} created`);
    await sendInvitationEmail(user.email);
  }

  return user;
}
