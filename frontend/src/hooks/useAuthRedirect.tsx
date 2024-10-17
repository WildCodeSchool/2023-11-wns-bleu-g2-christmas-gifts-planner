import { useEffect } from "react";
import { useRouter } from "next/router";
import { useProfileQuery } from "@/graphql/generated/schema";
import { useApolloClient } from "@apollo/client";

export function useAuthRedirect() {
  const router = useRouter();
  const { data: currentUser, refetch } = useProfileQuery({
    errorPolicy: "ignore",
  });
  const client = useApolloClient();

  useEffect(() => {
    if (!currentUser?.profile?.id) {
      if (router.pathname !== "/signup" && router.pathname !== "/dashboard") {
        router.push("/login");
      }
    }
  }, [currentUser, router]);

  return { currentUser, refetch, client };
}
