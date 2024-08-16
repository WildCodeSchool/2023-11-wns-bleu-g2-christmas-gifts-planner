import { useProfileQuery } from "@/graphql/generated/schema";
import { Box, CardBody } from "@chakra-ui/react";
import React from "react";

export default function GroupList({ name }: { name: string }) {
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });
  return (
    <>
      {/* <CardBody
        width="90%"
        m="auto"
        h="100dvh"
        paddingBlock="1rem"
        marginBlock="1rem"
        boxShadow="base"
        borderRadius="md"
        bg="secondary.lower"
      > */}
      <Box
        m="auto"
        paddingBlock="1rem"
        marginBlock="1rem"
        boxShadow="base"
        borderRadius="md"
        bg="secondary.lower"
      >
        {name}
      </Box>
      {/* </CardBody> */}
    </>
  );
}
