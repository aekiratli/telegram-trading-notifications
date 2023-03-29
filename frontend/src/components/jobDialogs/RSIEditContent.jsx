import * as React from 'react';
import { InputLabel, MenuItem, Select, FormControl, TextField } from '@mui/material';
import { INTERVALS } from '../../utils/binance';
import { useJobContext } from './JobContext';

export default function RSIEditContent() {

  const {
    value,
    setValue,
  } = useJobContext()


  const handleValue = (e) => {
    if (/^\d*$/.test(e.target.value))
      setValue(e.target.value)
  };

  return (
    <>
      <TextField
        required
        autoFocus
        value={value}
        onChange={handleValue}
        margin="dense"
        id="value"
        label="RSI Threshold"
        type="text"
        fullWidth
      />
    </>
  )
}