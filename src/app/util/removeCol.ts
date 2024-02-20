import { IColumnProperties } from "../types/IColumnProperties";

export default function removeCol(
  id: string,
  columns: IColumnProperties[],
  setColumns: (columns: IColumnProperties[]) => void
) {
  const filtered = [...columns].filter(
    (curr: IColumnProperties) => curr.id !== id
  );
  setColumns(filtered);
}
