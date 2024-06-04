import { execute } from "../jest.setup";
import User from "../src/entities/User";
import addUser from "./operations/addUser";
import getUsers from "./operations/getUsers";

describe("Users Resolver", () => {
  it("should read users", async () => {
    await User.create({
      firstName: "user1",
      lastName: "userName1",
      email: "userEmail1",
      password: "Paswordtest/1",
    }).save();
    await User.create({
      firstName: "user2",
      lastName: "userName2",
      email: "userEmail2",
      password: "Paswordtest/2",
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

  it("should create a user", async () => {
    const res = await execute(addUser, {
      data: {
        email: "emailtest2@mail.com",
        firstName: "firstname test2",
        lastName: "lastname test2",
        password: "Paswordtest/2",
      },
    });
    expect(JSON.stringify(res, null, 2)).toMatchInlineSnapshot(`
"{
  "data": {
    "createUser": {
      "id": "1",
      "firstName": "firstname test2",
      "lastName": "lastname test2",
      "email": "emailtest2@mail.com"
    }
  }
}"
`);
  });
});
