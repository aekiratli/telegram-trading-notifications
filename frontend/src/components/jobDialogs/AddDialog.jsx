import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialog({open, setOpen}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add a new Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hello
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}