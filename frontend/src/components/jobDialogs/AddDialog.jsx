import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import RSIAddContent from './RSIAddContent';
import { useFetchJobTypes } from '../../api/queries';
import { useJobContext } from './JobContext';

export default function AddDialog({ open, setOpen }) {

  const {jobType, setJobType, jobData} = useJobContext()

  const handleClose = () => {
    setOpen(false);
    setJobType()
  };

  const handleJobChange = (e) => {
    console.log(e.target.value)
    setJobType(e.target.value)
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
        <Button>Add</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}