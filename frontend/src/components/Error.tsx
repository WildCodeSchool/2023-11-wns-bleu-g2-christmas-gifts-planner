import React from "react";
import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

export default function Error({
  image,
  alt,
  message,
}: {
  image: string | StaticImageData;
  alt: string;
  message: string;
}) {
  return (
    <>
      <Card
        align="center"
        maxWidth={{ base: "90%", md: "48rem" }}
        m="auto"
        paddingBlock={10}
        marginBlock={4}
      >
        <CardBody>
          <Box maxWidth={{ base: "80%", md: "50%" }} margin={"auto"}>
            <Image src={image} alt={alt}></Image>
          </Box>
          <Text fontSize={"xl"} textAlign="center">
            {message}
          </Text>
        </CardBody>
      </Card>
    </>
  );
}
