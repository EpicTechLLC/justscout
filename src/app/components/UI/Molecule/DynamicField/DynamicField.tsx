import { IColumnProperties } from "@/app/types/IColumnProperties";
import Grid from "@mui/material/Grid";
import { DataTypes } from "@/app/enums/DataTypes";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
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
      case DataTypes.NUMBER:
        return (
          <TextField
            type={dataType === DataTypes.NUMBER ? "number" : "text"}
            fullWidth
            label={label}
            value={value}
            disabled={readOnly}
            onChange={(e) => (onChange ? onChange(e.target.value) : null)}
          />
        );
      case DataTypes.BOOLEAN:
        return (
          <FormGroup>
            <FormControlLabel
              label={label}
              control={
                <Checkbox
                  checked={Boolean(value)}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange ? onChange(e.target.checked) : null
                  }
                />
              }
            />
          </FormGroup>
        );
      default:
        console.error(dataType);
        break;
    }
  }
  return (
    <Grid container spacing={2} m={1}>
      <Grid item>{getField()}</Grid>
    </Grid>
  );
}
