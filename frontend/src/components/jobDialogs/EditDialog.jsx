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
import { INTERVALS } from '../../utils/binance';

export default function EditDialog({open, setOpen}) {
  const {job, value, channels, resetCandles, interval, candles, message} = useJobContext()
  const queryClient = useQueryClient()
  const { setSnackbar } = useAppContext()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    const newJob = {...job}
    const minutes = INTERVALS.find(interal_ => interal_.value === interval).minutes
    const sinceWhen = `${minutes * candles}m ago`

    newJob.config.rsi_value = parseInt(value)
    newJob.channels = [...channels].map(channel => channel.id)
    newJob.config.candles_to_reset = parseInt(resetCandles)
    newJob.config.since_when =sinceWhen
    newJob.config.msg =message

    setIsLoading(true)
    apiFetch(API_URL.editJob(),newJob)
    .then(response => {
      setOpen(false)
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
          <Button variant='contained' disabled={isLoading || channels.length === 0} onClick={handleEdit}>Edit</Button>
          <Button variant='contained' onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}