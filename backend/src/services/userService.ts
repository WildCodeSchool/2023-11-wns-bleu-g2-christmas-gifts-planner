import Group from "../entities/Group";
import User from "../entities/User";
import { generateRandomPassword, generateToken } from "./authService";
import { sendAddedToGroupEmail, sendInvitationEmail } from "./emailService";

/**
 * Finds a user by their email.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return await User.findOneBy({ email });
}

/**
 * Finds a user by their email, creating a new user if one does not exist.
 */
export async function findOrCreateUserByEmail(email: string): Promise<User> {
  // Find the user by their email
  let user = await findUserByEmail(email);

  // If the user doesn't exist, create a new user
  if (!user) {
    const token = generateToken();
    user = new User();
    user.email = email;
    user.password = generateRandomPassword();
    user.temporaryPassword = true;
    user.verificationToken = token;
    await user.save();
    console.info(`User with email ${email} created`);
  }

  return user;
}

/**
 * Sends an email to the user based on their group and user information.
 * If the user has a temporary password, an invitation email is sent.
 * Otherwise, an added to group email is sent.
 */
export function sendAnEmail(group: Group, user: User, id: number) {
  const { temporaryPassword, email, verificationToken } = user;
  const {
    name,
    owner: { lastName, firstName },
  } = group;

  if (temporaryPassword) {
    sendInvitationEmail(
      email,
      name,
      id,
      verificationToken,
      lastName,
      firstName
    );
  } else {
    sendAddedToGroupEmail(email, name, id, lastName, firstName);
  }
}
