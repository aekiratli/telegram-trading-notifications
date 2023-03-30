import * as React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useAppContext } from '../../AppContext';
import apiFetch from '../../api/fetcher';
import { INTERVALS } from '../../utils/binance'
import { API_URL } from '../../api/urls';
import { useQueryClient } from 'react-query';

export default function DeleteDialog({ open, setOpen, channel }) {


  const queryClient = useQueryClient()
  const { setSnackbar } = useAppContext()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e) => {
    setIsLoading(true)
    apiFetch(API_URL.deleteChannel(channel.id))
    .then(response => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['list_channels'] })
      setSnackbar({ open: true, message: "Channel is deleted", type: 'success' })
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
      fullWidth={true}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Deleting Channel - {channel?.name}</DialogTitle>
      <DialogActions>
        <Button variant='contained' disabled={isLoading} onClick={handleDelete}>Delete</Button>
        <Button variant='contained' onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}