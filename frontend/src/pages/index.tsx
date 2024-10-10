import { Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import { Gift, TreePine, UsersRound } from "lucide-react";

import AboutCard from "@/components/AboutCard";
import AboutUs from "@/components/AboutUs";
import Link from "next/link";
import { useTranslation } from "react-i18next";
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
      <Flex flexDirection="column" gap={6}>
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
          marginBlock={4}
          src="/Gifty-logo.svg"
          alt="Gifty"
          maxWidth={{ base: "40%", md: "16rem" }}
        />

        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={4}
          margin={"auto"}
          maxW={"95%"}
        >
          {homepageCardData.map((x) => (
            <AboutCard
              key={x.step}
              icon={x.icon}
              color="tertiary.medium"
              step={x.step}
              description={x.description}
            />
          ))}
        </Flex>
        <Center>
          <Flex flexDirection="column" gap={4}>
            <Button variant={"whiteGoldenButton"}>
              <Link href="/signup">{t("no-account")}</Link>
            </Button>
            <Button variant="goldenButton">
              <Link href="/login">{t("sign-in")}</Link>
            </Button>
          </Flex>
        </Center>
        <AboutUs />
      </Flex>
    </>
  );
}
