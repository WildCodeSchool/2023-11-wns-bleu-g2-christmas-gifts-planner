import React from "react";
import { Card, CardBody, Text } from "@chakra-ui/react";
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
        bg={"secondary.lowest"}
      >
        <CardBody>
          <Image src={image} alt={alt}></Image>
          <Text>{message}</Text>
        </CardBody>
      </Card>
    </>
  );
}
