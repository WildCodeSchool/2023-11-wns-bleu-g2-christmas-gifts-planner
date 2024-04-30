import { execute } from "../jest.setup";
import User from "../src/entities/User";
import getUsers from "./operations/getUsers";

describe("Users Resolver", () => {
  it("should read users", async () => {
    await User.create({
      firstName: "user1",
      lastName: "userName1",
      email: "userEmail1",
    }).save();
    await User.create({
      firstName: "user2",
      lastName: "userName2",
      email: "userEmail2",
    }).save();
    const res = await execute(getUsers);
    expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "users": [
      {
        "email": "userEmail1",
        "firstName": "user1",
        "id": "1",
        "lastName": "userName1",
      },
      {
        "email": "userEmail2",
        "firstName": "user2",
        "id": "2",
        "lastName": "userName2",
      },
    ],
  },
}
`);
  });
});
