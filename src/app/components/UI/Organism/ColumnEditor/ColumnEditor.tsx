import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import ColumnView from "../../Molecule/ColumnView/ColumnView";
import ColumnEdit from "../../Molecule/ColumnEdit/ColumnEdit";

export type ColumnEditorProps = {
  columns: IColumnProperties[];
  onChange?: (change: IColumnProperties) => unknown;
  removeCol?: (id: string) => unknown;
  addColumn?: () => unknown;
  title: string;
  readonly?: boolean;
};

export default function ColumnEditor({
  columns,
  onChange,
  removeCol,
  addColumn,
  title,
  readonly = false,
}: ColumnEditorProps) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!readonly ? (
        <Button variant="contained" sx={{ mb: 2 }} onClick={addColumn}>
          Add
        </Button>
      ) : null}
      {columns.length >= 16 && !readonly ? (
        <Typography color="error">
          Warning: having more than 16 columns effects QR code scanning on some
          devices
        </Typography>
      ) : null}
      {columns.length > 0 ? (
        <Card variant="outlined">
          <CardContent>
            {columns?.map((column, index) => (
              <div key={index}>
                {index > 0 ? <Divider /> : null}
                {readonly ? (
                  <ColumnView {...column} />
                ) : (
                  <ColumnEdit
                    {...column}
                    remove={removeCol}
                    onChange={onChange}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
