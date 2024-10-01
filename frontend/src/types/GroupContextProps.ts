export interface GroupContextProps {
  groupId: string;
  ownerId: string;
  groupName: string;
  setGroupData: (groupId: string, ownerId: string, groupName: string) => void;
}
