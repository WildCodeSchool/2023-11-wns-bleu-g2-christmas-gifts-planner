import { gql, useQuery } from "@apollo/client";
import Test from "@/components/Test";
import React from "react";

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

 

  const hello: string = "Hello World";

  const { data, loading, error } = useQuery(GET_USERS);
  console.log(data);

  return (
    <main>
      <h1>Welcome to my app Christmas Gifts Planner !</h1>
      <Test hello={ hello }/>
    </main>
  );
}
