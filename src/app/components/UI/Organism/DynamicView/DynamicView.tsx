import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import DynamicField from "../../Molecule/DynamicField/DynamicField";
import { IRecord } from "@/app/types/IRecord";

export type DynamicViewProps = {
  columns: IColumnProperties[];
  records: IRecord[];
  onChange: (change: IRecord) => void;
  title: string;
  readonly?: boolean;
};

export default function DynamicView({
  columns,
  records,
  onChange,
  title,
}: DynamicViewProps) {
  function updateRecord(val: any, col: IColumnProperties) {
    if (onChange) {
      onChange({
        id: col.id,
        value: val,
      } as IRecord);
    }
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {columns.length > 0 ? (
        <Card variant="outlined">
          <CardContent>
            {records?.map((record, index) => {
              const col = columns.find((col) => col.id === record.id);
              if (!col) {
                return;
              }
              return (
                <div key={index}>
                  {index > 0 ? <Divider /> : null}
                  <DynamicField
                    {...col}
                    {...record}
                    onChange={(value) => updateRecord(value, col)}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
