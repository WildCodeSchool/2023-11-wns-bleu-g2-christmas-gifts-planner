import { useGroupByIdQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import React from "react";

export default function Group() {
  const router = useRouter();
  const { id } = router.query;

  const { data: groupeId } = useGroupByIdQuery({
    variables: { groupId: Number(id) },
  });
  const members = groupeId?.groupById.members;
  return (
    <div>
      <h1>Group {id}</h1>
      {members?.map((member) => <div key={member.id}>{member.email}</div>)}
    </div>
  );
}
