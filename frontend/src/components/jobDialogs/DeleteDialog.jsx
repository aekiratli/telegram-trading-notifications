import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useJobContext } from './JobContext';
import apiFetch from '../../api/fetcher';
import { API_URL } from '../../api/urls';
import { useQueryClient } from 'react-query';
import { useAppContext } from '../../AppContext';

export default function DeleteDialog({open, setOpen}) {

  const [isLoading, setIsLoading] = React.useState(false)
  const {job} = useJobContext()
  const queryClient = useQueryClient()
  const { setSnackbar } = useAppContext()

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleDelete = () => {
    setIsLoading(true)
    apiFetch(API_URL.deleteJob(job.id))
    .then(response => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['list_jobs'] })
      setSnackbar({ open: true, message: "Deleted", type: 'success' })
    })
    .catch(error => {
      setSnackbar({ open: true, message: "Something went wrong", type: 'error' })
    })
    .finally(error => {
      setIsLoading(false)
    });
  };

  return (
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Deleting {job?.name}</DialogTitle>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleDelete}>Delete</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
  );
}