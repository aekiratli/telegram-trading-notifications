import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useJobContext } from './JobContext';
import RSIEditContent from './RSIEditContent';
import apiFetch from '../../api/fetcher';
import { API_URL } from '../../api/urls';
import { useQueryClient } from 'react-query';
import { useAppContext } from '../../AppContext';

export default function EditDialog({open, setOpen}) {
  const {job, value} = useJobContext()
  const queryClient = useQueryClient()
  const { setSnackbar } = useAppContext()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    const newJob = {...job}
    newJob.config.rsi_value = value
    setIsLoading(true)
    apiFetch(API_URL.editJob(),newJob)
    .then(response => {
      //setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['list_jobs'] })
      setSnackbar({ open: true, message: "Job Updated!", type: 'success' })
    })
    .catch(error => {
      setSnackbar({ open: true, message: "Something went wrong", type: 'error' })
    })
    .finally(error => {
      setIsLoading(false)
    });
  };
  return (
    <React.Fragment>
      <Dialog
        maxWidth="sm"
        open={open}
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>Edit {job?.name}</DialogTitle>
        <DialogContent>
          {job?.type === "rsi" ? <RSIEditContent/> : <></>}
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleEdit}>Edit</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}