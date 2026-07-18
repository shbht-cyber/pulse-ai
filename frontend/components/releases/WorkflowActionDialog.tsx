import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  copied: boolean;
  message: string;
  onClose: () => void;
  onCopy: () => void;
  onCopiedClose: () => void;
};

export default function WorkflowActionDialog({
  copied,
  message,
  onClose,
  onCopy,
  onCopiedClose,
}: Props) {
  return (
    <>
      <Dialog open={Boolean(message)} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Workflow Action</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography whiteSpace="pre-line">{message}</Typography>
            <Button
              variant="contained"
              startIcon={<ContentCopyRoundedIcon />}
              onClick={onCopy}
            >
              Copy Action Packet
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={copied}
        autoHideDuration={2200}
        message="Copied action packet"
        onClose={onCopiedClose}
      />
    </>
  );
}
