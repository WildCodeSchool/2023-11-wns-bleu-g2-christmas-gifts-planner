import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
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
    icon:  <Group color="rgb(161, 7, 2)" size="2.5rem" />,
    step: "step1",
    description: "step1-description"
  },
  {
    icon:  <UsersRound color="rgb(161, 7, 2)" size="2.5rem" />,
    step: "step2",
    description: "step2-description"
  },
  {
    icon:  <Gift color="rgb(161, 7, 2)" size="2.5rem" />,
    step: "step3",
    description: "step3-description"
  }
]
  return (
    <>
      <Box flexDirection="column">
        <Center>
          <Heading fontSize="2xl">
            {t("heading-organize")}
          </Heading>
        </Center>
        <Image src="/Gifty-logo.svg" alt="Gifty" mt={8} w="20%" mx="40%"/>
{homepageCardData.map((x) => 
<Center key={x.step}>
      <Card
        width={{base: "95%", md: "40%"  }}
        mx={{base: "2.5%", md: "30%"  }}
        mt="4%"
        borderRadius={10}
        boxShadow="3px 4px 3px rgb(211, 211, 211)"
        border="1px solid lightgray"
      >
        <Grid templateRows="repeat(2, 1fr)" templateColumns='repeat(6, 1fr)'>
          <GridItem rowSpan={2} colSpan={1}>
            <Center h="100%">  
              {x.icon}
            </Center>
          </GridItem>
          <GridItem rowSpan={2} colSpan={5} p={0}>
            <CardHeader mb="-40px" pl={0}>
              <Heading size="sm" fontFamily="arial">{t(x.step)}</Heading>
            </CardHeader>
            <CardBody pl={0}>
              <Box>
                <Text pt="2" fontSize="sm">
                  {t(x.description)}
                </Text>
              </Box>
            </CardBody> 
          </GridItem>
        </Grid>
        </Card>
        </Center>
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
