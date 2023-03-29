import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import RSIAddContent from './RSIAddContent';
import { useJobContext } from './JobContext';
import { useAppContext } from '../../AppContext';
import apiFetch from '../../api/fetcher';
import { INTERVALS } from '../../utils/binance'
import { API_URL } from '../../api/urls';
import { useQueryClient } from 'react-query';

export default function AddDialog({ open, setOpen }) {

  const { 
    jobType,
    setJobType,
    jobData,
    name,
    setName,
    symbol,
    setSymbol,
    interval,
    setInterval,
    candles,
    setCandles,
    setValue,
    value } = useJobContext()

  const queryClient = useQueryClient()
  const { setSnackbar } = useAppContext()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleClose = () => {
    setOpen(false);
    setJobType()
    setInterval('')
    setCandles('')
    setName('')
    setSymbol()
    setValue()
  };

  const handleJobChange = (e) => {
    setJobType(e.target.value)
  };

  const handleAdd = (e) => {
    const minutes = INTERVALS.find(interal_ => interal_.value === interval).minutes
    const sinceWhen = `${minutes*candles}m ago`
    const payload = {
      name: name,
      job_type: jobType,
      config: {
        pair: symbol,
        candle_interval: interval,
        since_when: sinceWhen,
        rsi_value: value,
        last_run: 0,
      }
    }
    setIsLoading(true)
    apiFetch(API_URL.addJob(),payload)
    .then(response => {
      //setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['list_jobs'] })
      setSnackbar({ open: true, message: "Job is Added", type: 'success' })
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
      <DialogTitle>Add a new Job</DialogTitle>
      <DialogContent>
        <FormControl required fullWidth margin="dense">
          <InputLabel id="job_type-label">Job Type</InputLabel>
          <Select onChange={handleJobChange} labelId="job_type-label" id="job_type" label="Job Type">
            {jobData?.map(job => {
              return (<MenuItem key={job} value={job}>{job.toUpperCase()}</MenuItem>)
            })}
          </Select>
        </FormControl>
        {jobType === 'rsi' ? <RSIAddContent /> : <></>}
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={handleAdd}>Add</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}