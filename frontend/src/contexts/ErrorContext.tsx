import { createContext, useMemo, ReactNode, useContext } from "react";
import { ErrorContextType } from "../types/ErrorContextType";
import { useTranslation } from "react-i18next";

const ErrorContext = createContext<ErrorContextType>({
  messages: {
    notFound: "",
    notExist: "",
    unauthorized: "",
    result: "",
    generic: "",
  },
});

export const useErrorContext = () => useContext(ErrorContext);

export function ErrorContextProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const messages = {
    notFound: t("error-messages.not-found"),
    notExist: t("error-messages.not-exist"),
    unauthorized: t("error-messages.unauthorized"),
    result: t("error-messages.result"),
    generic: t("error-messages.generic"),
  };

  return (
    <ErrorContext.Provider value={{ messages }}>
      {children}
    </ErrorContext.Provider>
  );
}
