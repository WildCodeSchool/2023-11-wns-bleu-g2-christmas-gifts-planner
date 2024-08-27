import { Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function DashboardWhithoutGroup() {
  const { t } = useTranslation();
  return (
    <>
      <Text>
       { t("no-group-warning") }
      </Text>
      <Text marginTop="1rem">
        {t("join-to-start")}
      </Text>
    </>
  );
}
