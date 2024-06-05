import { execute } from "../jest.setup";
import User from "../src/entities/User";
import addUser from "./operations/addUser";
import getUsers from "./operations/getUsers";

describe("Users Resolver", () => {
  it("should read users", async () => {
    const firstName1 = "user1";
    const lastName1 = "userName1";
    const email1 = "userEmail1";
    const password1 = "Paswordtest/1";
    const u1 = new User();
    u1.firstName = firstName1;
    u1.lastName = lastName1;
    u1.email = email1;
    u1.password = password1;
    await u1.save();

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
