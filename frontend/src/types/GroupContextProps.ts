export interface GroupContextProps {
  groupId: number | null;
  ownerId: number | null;
  setGroupData: (groupId: number, ownerId: number) => void;
}
