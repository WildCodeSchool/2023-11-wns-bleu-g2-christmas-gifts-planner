import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import DevCard from "./DevCard";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();
  const developers = [
    {
      name: "Alexandre Richert",
      role: "about.dev-role",
      description: "about.alexandre-description",
      color: "secondary.medium",
      link: "https://github.com/AlexandreRichert",
    },
    {
      name: "Alon Ben David",
      role: "about.dev-role",
      description: "about.alon-description",
      color: "tertiary.low",
      link: "https://github.com/mistral-nw",
    },
    {
      name: "Robin Kolasinski",
      role: "about.dev-role",
      description: "about.robin-description",
      color: "primary.lowest",
      link: "https://github.com/Fangornito",
    },
    {
      name: "Jasmine Grozinger",
      role: "about.dev-role",
      description: "about.jasmine-description",
      color: "tertiary.lower",
      link: "https://github.com/Jasminegrz",
    },
  ];

  return (
    <>
      <Box bg={"white"} _dark={{ bg: "dark.surface10" }} p={6}>
        <Box m={"auto"} width={"90%"} alignContent={"center"}>
          <Heading mb={6}>{t("about.title")}</Heading>
          <Text fontSize="sm" textAlign={"justify"}>
            {t("about.description1")}
          </Text>
          <Text fontSize="sm" textAlign={"justify"}>
            {t("about.description2")}
          </Text>
        </Box>
      </Box>
      <Box p={6}>
        <Box m={"auto"} width={"90%"} alignContent={"center"}>
          <Heading mb={6}>{t("our-team")}</Heading>

          <Flex flexWrap="wrap" justifyContent="center" gap={8}>
            {developers.map((dev, index) => (
              <DevCard
                key={index}
                name={dev.name}
                link={dev.link}
                color={dev.color}
                role={dev.role}
                description={dev.description}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
