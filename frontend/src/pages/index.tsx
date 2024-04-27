import { gql, useQuery } from "@apollo/client";

export default function Home() {
  const GET_USERS = gql`
    query Users {
      users {
        id
        firstName
        lastName
        email
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_USERS);
  console.log(data);

  return (
    <main>
      <h1>Welcome to my app Christmas Gifts Planner !</h1>
    </main>
  );
}
