import { CardBody, Text } from "@chakra-ui/react";
import React from "react";

export default function DashboardWhithoutGroup() {
  return (
    <CardBody>
      <Text>
        Il semble que vous n&apos;appartenez à aucun groupe de discussion
      </Text>
      <Text>
        Regoignez un groupe existant ou créez en un nouveau pour commencer à
        échangeer des idées cadeaux avec vos amis !
      </Text>
    </CardBody>
  );
}
