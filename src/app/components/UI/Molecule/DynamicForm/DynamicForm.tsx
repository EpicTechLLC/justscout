import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DataTypes } from "@/app/enums/DataTypes";

export interface ColumnEditProps extends IColumnProperties {
  remove?: (id: string) => unknown;
  onChange?: (change: IColumnProperties) => unknown;
}
export default function DynamicForm({
  id,
  remove,
  label,
  value,
  onChange,
  dataType,
}: ColumnEditProps) {
  const [labelLocal, setLabel] = useState(label);
  const [valueLocal, setValue] = useState(value);
  const [dataTypeLocal, setDataTypeLocal] = useState<DataTypes>(
    dataType ? dataType : DataTypes.TEXT
  );

  const update = useCallback(() => {
    if (onChange) {
      onChange({
        id,
        label: labelLocal,
        value: "",
        dataType: dataTypeLocal,
      });
    }
  }, [id, labelLocal, onChange, valueLocal, dataTypeLocal]);
  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelLocal, valueLocal, dataTypeLocal]);
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
          fullWidth
        />
      </Grid>
      <Grid md={5}>
        <FormControl fullWidth>
          <InputLabel id="data-type-select">Data Type</InputLabel>
          <Select
            labelId="data-type-select"
            id="data-type-select"
            value={dataTypeLocal}
            label="data-type-select"
            onChange={(e) => setDataTypeLocal(e.target.value as DataTypes)}
          >
            <MenuItem value={DataTypes.TEXT}>Text</MenuItem>
          </Select>
        </FormControl>
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
