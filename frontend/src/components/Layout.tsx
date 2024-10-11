import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
import { useProfileQuery } from "@/graphql/generated/schema";

export default function Layout({
  children,
}: {
  children: ReactNode;
  pageTitle: string;
}) {
  const { data: currentUser, refetch } = useProfileQuery({
    errorPolicy: "ignore",
  });
  return (
    <>
      <Head>
        <title> Christmas Gift Planner </title>
        <meta
          name="description"
          content="gift planner for family/friend group"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/gifty-logo.svg" />
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar onGroupDeleted={refetch} />
        <Box as="main" flex="1">
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
}
