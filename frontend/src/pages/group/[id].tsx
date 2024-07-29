import { useRouter } from "next/router";
import React from "react";

export default function Group() {
  const router = useRouter();
  const { id } = router.query;
  return <div>Group {id}</div>;
}
