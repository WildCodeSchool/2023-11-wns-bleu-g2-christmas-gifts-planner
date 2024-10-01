import { createContext, useContext, ReactNode, useState } from "react";
import { GroupContextProps } from "../types/GroupContextProps";

const GroupContext = createContext<GroupContextProps>({
  groupId: null,
  ownerId: null,
  setGroupData: () => {},
});

export const useGroupContext = () => useContext(GroupContext);

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const [ownerId, setOwnerId] = useState<number | null>(null);

  const setGroupData = (groupId: number, ownerId: number) => {
    setGroupId(groupId);
    setOwnerId(ownerId);
  };

  return (
    <GroupContext.Provider value={{ groupId, ownerId, setGroupData }}>
      {children}
    </GroupContext.Provider>
  );
};
