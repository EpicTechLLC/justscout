import { IRecord } from "../types/IRecord";

export default function updateColumns(
  record: IRecord,
  records: IRecord[],
  setRecords: (record: IRecord[]) => void
) {
  const newRecords = [];

  for (const item of records) {
    if (item.id === record.id) {
      newRecords.push(record);
    } else {
      newRecords.push(item);
    }
  }
  setRecords(newRecords);
}
