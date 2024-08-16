import User from "../entities/User";

export async function findUserByEmail(email: string): Promise<User | null> {
  return await User.findOneBy({ email });
}
