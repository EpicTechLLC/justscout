import Typography from "@mui/material/Typography";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import Grid from "@mui/material/Grid";

export default function ColumnView({ label, value }: IColumnProperties) {
  return (
    <Grid container spacing={2} m={1}>
      <Grid item>
        <Typography>
          <b>{label}</b> : {value}
        </Typography>
      </Grid>
    </Grid>
  );
}
