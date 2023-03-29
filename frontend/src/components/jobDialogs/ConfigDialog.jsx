import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useJobContext } from './JobContext';


export default function ConfigDialog({ open, setOpen }) {

  const { job } = useJobContext()

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Config of {job?.name}</DialogTitle>
      <DialogContent>
        <TextField
          id="json-textfield"
          fullWidth
          multiline
          rows={15}
          value={JSON.stringify(job?.config, null, 2)}
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}