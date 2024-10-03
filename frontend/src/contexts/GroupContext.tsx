import { createContext, useContext, ReactNode, useState } from "react";
import { GroupContextProps } from "../types/GroupContextProps";

const GroupContext = createContext<GroupContextProps>({
  groupId: "",
  ownerId: "",
  groupName: "",
  setGroupData: () => {},
});

export const useGroupContext = () => useContext(GroupContext);

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [groupId, setGroupId] = useState<string>("");
  const [ownerId, setOwnerId] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");

  const setGroupData = (
    groupId: string,
    ownerId: string,
    groupName: string
  ) => {
    setGroupId(groupId);
    setOwnerId(ownerId);
    setGroupName(groupName);
  };

  return (
    <GroupContext.Provider
      value={{ groupId, ownerId, groupName, setGroupData }}
    >
      {children}
    </GroupContext.Provider>
  );
};
