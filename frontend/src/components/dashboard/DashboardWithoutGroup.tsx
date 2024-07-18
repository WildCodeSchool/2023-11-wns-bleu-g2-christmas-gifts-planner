import { Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";

export default function DashboardWhithoutGroup() {
  return (
    <>
      <Text>
        Il semble que vous n&apos;appartenez à aucun groupe de discussion
      </Text>
      <Text marginTop="1rem">
        Regoignez un groupe existant ou créez en un nouveau pour commencer à
        échanger des idées cadeaux avec vos amis !
      </Text>
    </>
  );
}
