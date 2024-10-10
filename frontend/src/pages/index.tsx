import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Gift, TreePine, UsersRound } from "lucide-react";

import { useTranslation } from "react-i18next";
import AboutCard from "@/components/AboutCard";
import Link from "next/link";
export default function Home() {
  const { t } = useTranslation();

  const homepageCardData = [
    {
      icon: <TreePine size="3rem" strokeWidth={1} />,
      step: "step1",
      description: "step1-description",
    },
    {
      icon: <UsersRound size="3rem" strokeWidth={1} />,
      step: "step2",
      description: "step2-description",
    },
    {
      icon: <Gift size="3rem" strokeWidth={1} />,
      step: "step3",
      description: "step3-description",
    },
  ];
  return (
    <>
      <Box flexDirection="column">
        <Center>
          <Heading
            textAlign={"center"}
            size="2xl"
            maxWidth={{ base: "90%", md: "28rem" }}
          >
            {t("heading-organize")}
          </Heading>
        </Center>
        <Image
          m={"auto"}
          marginBlock={8}
          src="/Gifty-logo.svg"
          alt="Gifty"
          maxWidth={{ base: "40%", md: "16rem" }}
        />

        {homepageCardData.map((x) => (
          <AboutCard
            key={x.step}
            icon={x.icon}
            color="tertiary.medium"
            step={x.step}
            description={x.description}
          />
        ))}

        <Center>
          <Flex flexDirection="column" gap={5}>
            <Button variant={"whiteGoldenButton"}>
              <Link href="/signup">{t("no-account")}</Link>
            </Button>
            <Button variant="goldenButton">
              <Link href="/login">{t("sign-in")}</Link>
            </Button>
          </Flex>
        </Center>
      </Box>
    </>
  );
}
