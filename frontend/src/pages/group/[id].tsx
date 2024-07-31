import { useProfileQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import React from "react";

export default function Group() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: currentUser,
    refetch,
    loading,
  } = useProfileQuery({
    errorPolicy: "ignore",
  });
  console.log(currentUser);
  return <div>Group {id}</div>;
}
