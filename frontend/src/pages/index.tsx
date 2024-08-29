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
  return (
    <>
      <Box flexDirection="column">
        <Center>
          <Heading fontSize="m">
            {t("heading-organize")} ## TEST Deployement ##
          </Heading>
        </Center>

        <Link href="/">
          <Card
            mx="24px"
            mt="4%"
            boxShadow="5px 4px 5px rgb(0, 59, 30)"
            borderWidth="1px"
          >
            <Center mt="5%" mb="-18px">
              <Group color="rgb(161, 7, 2)" />
            </Center>

            <CardHeader mb="-40px">
              <Heading size="sm">{t("step1")}</Heading>
            </CardHeader>

            <CardBody>
              <Box>
                <Text pt="2" fontSize="sm">
                  {t("step1-description")}{" "}
                </Text>
              </Box>
            </CardBody>
          </Card>
        </Link>

        <Link href="/">
          <Card
            mx="24px"
            mt="4%"
            boxShadow="5px 4px 5px rgb(0, 59, 30)"
            borderWidth="1px"
          >
            <Center mt="5%" mb="-18px">
              <UsersRound color="rgb(161, 7, 2)" />
            </Center>

            <CardHeader mb="-40px">
              <Heading size="sm">
                {t("step2")}
              </Heading>
            </CardHeader>

            <CardBody>
              <Box>
                <Text pt="2" fontSize="sm">
                {t("step2-description")}{" "}
                </Text>
              </Box>
            </CardBody>
          </Card>
        </Link>

        <Link href="/">
          <Card
            mx="24px"
            mt="4%"
            boxShadow="5px 4px 5px rgb(0, 59, 30)"
            borderWidth="1px"
          >
            <Center mt="5%" mb="-18px">
              <Gift color="rgb(161, 7, 2)" />
            </Center>

            <CardHeader mb="-40px">
              <Heading size="sm">
               {t("step3")}
              </Heading>
            </CardHeader>

            <CardBody>
              <Box>
                <Text pt="2" fontSize="sm">
                  {t("step3-description")}{" "}
                </Text>
              </Box>
            </CardBody>
          </Card>
        </Link>

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
