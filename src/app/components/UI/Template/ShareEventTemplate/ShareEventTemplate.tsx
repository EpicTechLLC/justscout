import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QRCodeCanvas from "qrcode.react";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import { useState } from "react";

export interface ShareEventTemplateProps {
  open: boolean;
  onClose: () => void;
  eventName: string;
  urlToCopy: string;
  columns: IColumnProperties[];
}

export default function ShareEventTemplate({
  eventName,
  open,
  onClose,
  urlToCopy,
  columns,
}: ShareEventTemplateProps) {
  const [qrCodeType, setQRCodeValue] = useState("link");
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share your data with other teams</DialogTitle>
      <DialogContent>
        <Typography>Event Name: {eventName}</Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="column"
          mt={1}
        >
          <Grid item>
            <QRCodeCanvas
              size={200}
              value={
                qrCodeType === "link"
                  ? urlToCopy
                  : JSON.stringify({
                      name: name,
                      eventData: columns,
                    })
              }
            />
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              color="primary"
              value={qrCodeType}
              exclusive
              onChange={(_e, str: string) => setQRCodeValue(str)}
            >
              <ToggleButton value="link">Link</ToggleButton>
              <ToggleButton value="json">JSON</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                Copy Link
                <IconButton
                  onClick={() => void navigator.clipboard.writeText(urlToCopy)}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Grid>
              <Grid item>
                Copy JSON
                <IconButton
                  onClick={() =>
                    void navigator.clipboard.writeText(
                      JSON.stringify({
                        name: eventName,
                        eventData: columns,
                      })
                    )
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
