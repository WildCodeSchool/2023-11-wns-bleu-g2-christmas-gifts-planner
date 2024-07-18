import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({
  children,
  pageTitle,
}: {
  children: ReactNode;
  pageTitle: string;
}) {
  return (
    <>
      <Head>
        <title>{pageTitle} Christmas Gift Planner </title>
        <meta
          name="description"
          content="gift planner for family/friend group"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/gifty-logo.svg" />
      </Head>
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}
