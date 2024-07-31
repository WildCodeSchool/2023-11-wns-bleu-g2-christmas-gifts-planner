import { Card, Spinner } from "@chakra-ui/react";
import React from "react";

export default function Loader() {
  return (
    <>
      <Card
        align="center"
        width={{ base: "90%", md: "48rem" }}
        m="auto"
        paddingBlock={10}
        marginBlock={4}
      >
        <Spinner
          speed="0.7s"
          size="xl"
          color="tertiary.medium"
          emptyColor="secondary.low"
        />
      </Card>
    </>
  );
}
