import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DataTypes } from "@/app/enums/DataTypes";
import { BlueAllianceLinks } from "@/app/enums/BlueAllianceLinks";

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
  blueAllianceLink,
  readOnly = false,
}: ColumnEditProps) {
  const [labelLocal, setLabel] = useState(label);
  const [valueLocal, setValue] = useState(value);
  const [dataTypeLocal, setDataTypeLocal] = useState<DataTypes>(
    dataType ? dataType : DataTypes.TEXT
  );
  const [blueAllianceLinkLocal, setBlueAllianceLinkLocal] = useState<
    BlueAllianceLinks | undefined
  >(blueAllianceLink);

  const update = useCallback(() => {
    if (onChange) {
      onChange({
        id,
        label: labelLocal,
        value: "",
        dataType: dataTypeLocal,
        readOnly: readOnly,
        blueAllianceLink: blueAllianceLinkLocal,
      } as IColumnProperties);
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
      <Grid md={4} xs={12}>
        <TextField
          label="Label"
          onChange={(e) => setLabel(e.target.value)}
          value={labelLocal}
          fullWidth
          disabled={readOnly}
        />
      </Grid>
      <Grid md={3} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="data-type-select">Data Type</InputLabel>
          <Select
            labelId="data-type-select"
            id="data-type-select"
            value={dataTypeLocal}
            label="data-type-select"
            onChange={(e) => setDataTypeLocal(e.target.value as DataTypes)}
            disabled={readOnly}
          >
            {Object.values(DataTypes).map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid md={3} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="blue-alliance-link-select">
            Blue Alliance Link
          </InputLabel>
          <Select
            labelId="blue-alliance-link-select"
            id="blue-alliance-link-select"
            value={blueAllianceLinkLocal}
            label="blue-alliance-link-select"
            onChange={(e) =>
              e.target.value
                ? setBlueAllianceLinkLocal(e.target.value as BlueAllianceLinks)
                : null
            }
            disabled={readOnly}
          >
            <MenuItem value={undefined}>None</MenuItem>
            {Object.values(BlueAllianceLinks).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid md={1} xs={12}>
        <IconButton
          onClick={() => {
            if (remove) remove(id);
          }}
          sx={{ float: "right", mt: 1 }}
          disabled={readOnly}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
