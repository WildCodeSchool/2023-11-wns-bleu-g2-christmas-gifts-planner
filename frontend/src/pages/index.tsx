import { useUsersQuery } from "@/graphql/generated/schema";
import { gql, useQuery } from "@apollo/client";
import Test from "@/components/Test";
import React from "react";

export default function Home() {
  const { data, loading, error } = useUsersQuery();
  const usersList = data?.users || [];

  return (
    <main>
      <h1>Welcome to my app Christmas Gifts Planner !</h1>
      <h2>My list of users :</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        usersList?.map((user) => {
          return (
            <div key={user.id}>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.email}</p>
              <p>#{user.id}</p>
            </div>
          );
        })
      )}
    </main>
  );
}
