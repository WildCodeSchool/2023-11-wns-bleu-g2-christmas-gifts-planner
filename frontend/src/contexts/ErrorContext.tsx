import { createContext, useMemo, ReactNode, useContext } from "react";
import { ErrorContextType } from "../types/ErrorContextType";

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
  const messages = {
    notFound: "Oups, la page demandée n'a pas été trouvée",
    notExist: "Cette page n'existe pas",
    unauthorized: "Vous n'êtes pas autorisé a consulter la page demandée",
    result: "Oups, il semble qu'il n'y ait pas de résultats",
    generic: "Une erreur s'est produite. Veuillez réessayer plus tard",
  };

  return (
    <ErrorContext.Provider value={{ messages }}>
      {children}
    </ErrorContext.Provider>
  );
}
