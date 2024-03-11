import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import DynamicForm from "../../Molecule/DynamicForm/DynamicForm";

export type DynamicEditorProps = {
  columns: IColumnProperties[];
  onChange?: (change: IColumnProperties) => unknown;
  removeCol?: (id: string) => unknown;
  addColumn?: () => unknown;
  title: string;
  readonly?: boolean;
};

export default function DynamicEditor({
  columns,
  onChange,
  removeCol,
  addColumn,
  title,
  readonly = false,
}: DynamicEditorProps) {
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
      {columns.length > 0 ? (
        <Card variant="outlined">
          <CardContent>
            {columns?.map((column, index) => (
              <div key={column.id}>
                {index > 0 ? <Divider /> : null}
                <DynamicForm
                  {...column}
                  remove={removeCol}
                  onChange={onChange}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
