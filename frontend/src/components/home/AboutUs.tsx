import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import DevCard from "./DevCard";

export default function AboutUs() {
  const developers = [
    {
      name: "Alexandre Richert",
      role: "Développeur Full-Stack",
      description:
        "Passionné par le développement Frontend, Alexandre a conçu l'interface utilisateur et implémenté les fils de discussions.",
      color: "secondary.medium",
      link: "https://github.com/AlexandreRichert",
    },
    {
      name: "Alon Ben David",
      role: "Développeur Full-Stack",
      description:
        "Alon a implémenté le système de messagerie instantanée, permettant une communication fluide entre les membres du groupe.",
      color: "tertiary.low",
      link: "https://github.com/mistral-nw",
    },
    {
      name: "Robin Kolasinski",
      role: "Développeur Full-Stack",
      description:
        "Robin a développé l'inscription, la connexion, et la gestion des profils utilisateurs, garantissant la sécurité des comptes.",
      color: "primary.lowest",
      link: "https://github.com/Fangornito",
    },
    {
      name: "Jasmine Grozinger",
      role: "Développeur Full-Stack",
      description:
        "Jasmine a conçu la fonctionnalité de création de groupes en veillant à ce que Gifty soit convivial et agréable à utiliser.",
      color: "tertiary.lower",
      link: "https://github.com/Jasminegrz",
    },
  ];

  return (
    <>
      <Box bg={"white"} p={6}>
        <Box m={"auto"} width={"90%"} alignContent={"center"}>
          <Heading mb={6}>A propos</Heading>
          <Text fontSize="sm" textAlign={"justify"}>
            Gifty est une application qui facilite l&apos;organisation des
            cadeaux entre amis et en famille. Ce projet est développé dans le
            cadre de notre apprentissage à la Wild Code School.
          </Text>
          <Text fontSize="sm" textAlign={"justify"}>
            Nous tenons à remercier la Wild Code School pour leur soutien et
            pour nous avoir donné l&apos;opportunité de réaliser ce projet.
          </Text>
        </Box>
      </Box>
      <Box p={6}>
        <Box m={"auto"} width={"90%"} alignContent={"center"}>
          <Heading mb={6}>Notre team</Heading>

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
