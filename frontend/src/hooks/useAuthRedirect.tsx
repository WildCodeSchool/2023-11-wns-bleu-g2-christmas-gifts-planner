import { useEffect } from "react";
import { useRouter } from "next/router";
import { useProfileQuery } from "@/graphql/generated/schema";

export function useAuthRedirect() {
  const router = useRouter();
  
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });

  useEffect(() => {
    if (!currentUser?.profile?.id) {
      if (router.pathname !== "/signup" && router.pathname !== "/") {
        router.push("/login");
      }
    }
  }, [currentUser, router]);

  return { currentUser };
}
