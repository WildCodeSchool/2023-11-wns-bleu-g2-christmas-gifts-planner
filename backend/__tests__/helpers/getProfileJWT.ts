import jwt from "jsonwebtoken";
import User from "../../src/entities/User";
import env from "../../src/env";

export default async function () {
  const user = new User();
  Object.assign(user, {
  firstName: "user1",
  lastName: "userName1",
  email: "userEmail1",
  password: "Paswordtest/1",
  });
  await user.save();
  const JWT = await jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
    return { user, JWT} ;
}