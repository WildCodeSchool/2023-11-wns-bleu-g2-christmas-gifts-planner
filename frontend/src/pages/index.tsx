import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { Gift, Group, UsersRound } from "lucide-react";
import { useRouter } from "next/router";
import { useProfileQuery } from "@/graphql/generated/schema";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const homepageCardData = [{
    icon:  <Group color="rgb(161, 7, 2)" />,
    step: "step1",
    description: "step1-description"
  },
  {
    icon:  <UsersRound color="rgb(161, 7, 2)" />,
    step: "step2",
    description: "step2-description"
  },
  {
    icon:  <Gift color="rgb(161, 7, 2)" />,
    step: "step3",
    description: "step3-description"
  }
]
  return (
    <>
      <Box flexDirection="column">
        <Center>
          <Heading fontSize="m">
            {t("heading-organize")} ## TEST Deployement ##
          </Heading>
        </Center>
{homepageCardData.map((x) => 
        <Card
        key={x.step}
        mx="24px"
        mt="4%"
        boxShadow="5px 4px 5px rgb(211, 211, 211)"
        borderWidth="1px"
      >
        <Center mt="5%" mb="-18px">
          {x.icon}
        </Center>

        <CardHeader mb="-40px">
          <Heading size="sm">{t(x.step)}</Heading>
        </CardHeader>

        <CardBody>
          <Box>
            <Text pt="2" fontSize="sm">
              {t(x.description)}{" "}
            </Text>
          </Box>
        </CardBody>
      </Card>
        )
}
        <Center>
          <Flex flexDirection="column" gap={5} mt={5}>
            <Link href="/signup">
              <Button
                width="150px"
                bg="rgb(255, 255, 255)"
                variant="solid"
                rounded={50}
                boxShadow="2px 2px 5px rgb(0, 0, 0)"
              >
               {t("no-account")}
              </Button>
            </Link>

            <Link href="/login">
              <Button
                width="150px"
                mb="20px"
                bg="rgb(213, 166, 58)"
                variant="solid"
                rounded={50}
                boxShadow="2px 2px 5px rgb(0, 0, 0)"
              >
                {t("sign-in")}
              </Button>
            </Link>
          </Flex>
        </Center>
      </Box>
    </>
  );
}
