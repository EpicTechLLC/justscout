import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IColumnProperties } from "@/app/types/IColumnProperties";

export interface ColumnEditProps extends IColumnProperties {
  remove?: (id: string) => unknown;
  onChange?: (change: IColumnProperties) => unknown;
}
export default function ColumnEdit({
  id,
  remove,
  label,
  value,
  onChange,
}: ColumnEditProps) {
  const [labelLocal, setLabel] = useState(label);
  const [valueLocal, setValue] = useState(value);

  const update = useCallback(() => {
    if (onChange) {
      onChange({
        id,
        label: labelLocal,
        value: valueLocal,
      });
    }
  }, [id, labelLocal, onChange, valueLocal]);
  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelLocal, valueLocal]);
  useEffect(() => {
    setLabel(label);
    setValue(value);
  }, [label, value]);
  return (
    <Grid container spacing={2} m={1} alignItems={"stretch"}>
      <Grid md={5}>
        <TextField
          label="Label"
          onChange={(e) => setLabel(e.target.value)}
          value={labelLocal}
        />
      </Grid>
      <Grid md={5}>
        <TextField
          label="value"
          onChange={(e) => setValue(e.target.value)}
          value={valueLocal}
        />
      </Grid>
      <Grid md={2}>
        <IconButton
          onClick={() => {
            if (remove) remove(id);
          }}
          sx={{ float: "right" }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
