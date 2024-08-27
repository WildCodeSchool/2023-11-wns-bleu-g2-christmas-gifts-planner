import { createContext, useMemo } from "react";

interface ErrorContextType {
  messages: {
    notFound: string;
    notExist: string;
    unauthorized: string;
    result: string;
  };
}

const ErrorContext = createContext<ErrorContextType | null>(null);
export default ErrorContext;

import { ReactNode } from "react";

export function ErrorContextProvider({ children }: { children: ReactNode }) {
  const messages = {
    notFound: "Oups, la page demandée n'a pas été trouvée",
    notExist: "Cette page n'existe pas",
    unauthorized: "Vous n'êtes pas autorisé a consulter la page demandée",
    result: "Oups, il semble qu'il n'y ait pas de résultats",
    generic: "Une erreur s'est produite. Veuillez réessayer plus tard",
  };
  const MessagesErrorContextValue = useMemo(() => {
    return { messages };
  }, []);
  return (
    <ErrorContext.Provider value={MessagesErrorContextValue}>
      {children}
    </ErrorContext.Provider>
  );
}
