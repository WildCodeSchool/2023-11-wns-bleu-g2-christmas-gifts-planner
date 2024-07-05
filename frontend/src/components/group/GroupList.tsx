import { useProfileQuery } from "@/graphql/generated/schema";
import { Card } from "@chakra-ui/react";
import React from "react";

export default function GroupList({ name }: { name: string }) {
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });
  return (
    <>
      <Card
        align="center"
        width={{ base: "95%", md: "48rem" }}
        m="auto"
        h="100dvh"
        paddingBlock="1rem"
        marginBlock="1rem"
      >
        {name}
      </Card>
    </>
  );
}
