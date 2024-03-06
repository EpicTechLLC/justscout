import Typography from "@mui/material/Typography";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import Grid from "@mui/material/Grid";
import { DataTypes } from "@/app/enums/DataTypes";
import { TextField } from "@mui/material";
import { IRecord } from "@/app/types/IRecord";

export interface DynamicFieldProps extends IRecord, IColumnProperties {
  onChange?: (value: unknown) => void;
}

export default function DynamicField({
  label,
  value,
  dataType,
  onChange,
  readOnly,
}: DynamicFieldProps) {
  function getField() {
    switch (dataType) {
      case DataTypes.TEXT:
        return (
          <TextField
            fullWidth
            label={label}
            value={value}
            disabled={readOnly}
            onChange={(e) => (onChange ? onChange(e.target.value) : null)}
          />
        );

      default:
        break;
    }
  }
  return (
    <Grid container spacing={2} m={1}>
      <Grid item>{getField()}</Grid>
    </Grid>
  );
}
