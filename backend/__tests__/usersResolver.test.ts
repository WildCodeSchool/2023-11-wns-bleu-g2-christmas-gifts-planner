import { execute } from "../jest.setup";
import User, { UserRole } from "../src/entities/User";
import getProfileContext from "./helpers/getProfileContext";
import addUser from "./operations/addUser";
import Profile from "./operations/getProfile";

describe("Users Resolver", () => {
  it("should read Profile with admin jwt", async () => {

    const res = await execute(
      Profile,
      {data: {name: "test"}},
    await getProfileContext());
    expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "profile": {
      "firstName": "user1",
      "lastName": "userName1",
    },
  },
}
`);
  });

  it("should read Profile without admin jwt", async () => {
    const res = await execute(Profile, { data: {name: "test"}});
    expect(res).toMatchInlineSnapshot(`
{
  "data": null,
  "errors": [
    [GraphQLError: Cannot destructure property 'headers' of 'context.req' as it is undefined.],
  ],
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
