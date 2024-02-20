import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export interface ConfirmDeletionTemplateProps {
  isDeleteModalOpen: boolean;
  onClose: () => void;
  handleDeletion: () => void;
}

export default function ConfirmDeletionTemplate({
  isDeleteModalOpen,
  onClose,
  handleDeletion,
}: ConfirmDeletionTemplateProps) {
  return (
    <Dialog open={isDeleteModalOpen} onClose={onClose}>
      <DialogTitle>Are you user you want to delete this event?</DialogTitle>
      <DialogActions>
        <Button onClick={handleDeletion} color="error" variant="contained">
          Yes
        </Button>

        <Button onClick={onClose} variant="contained">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
