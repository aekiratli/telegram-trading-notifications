import * as React from 'react';
import {
  FormControl,
  TextField,
  Autocomplete,
} from '@mui/material';
import { useJobContext } from './JobContext';

export default function RSIEditContent() {
  const {
    value,
    setValue,
    channels,
    setChannels,
    channelData,
    resetCandles,
    setResetCandles,
    setCandles,
    candles,
    message,
    setMessage,
  } = useJobContext();

  const handleValue = (e) => {
    if (/^\d*$/.test(e.target.value)) setValue(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleChannels = (e, value) => {
    setChannels(value);
  };

  const handleResetCandles = (e) => {
    if (/^\d*$/.test(e.target.value)) setResetCandles(e.target.value);
  };

  const handleCandles = (e) => {
    if (/^\d*$/.test(e.target.value)) setCandles(e.target.value);
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
      <TextField
        required
        value={candles}
        onChange={handleCandles}
        margin="dense"
        id="candles"
        label="How Many Candles for History"
        type="text"
        fullWidth
        hiddenLabel
      />
      <TextField
        required
        value={resetCandles}
        onChange={handleResetCandles}
        margin="dense"
        id="reset-candles"
        label="How Many Candles for Resetting the Alert"
        type="text"
        fullWidth
        hiddenLabel
      />
      <FormControl required fullWidth margin="dense">
        <Autocomplete
          multiple
          required
          id="tags-standard"
          onChange={handleChannels}
          options={channelData}
          value={channels}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Channels" />
          )}
        />
      </FormControl>
      <TextField
        required
        onChange={handleMessage}
        value={message}
        autoFocus
        margin="dense"
        label="Alert message"
        type="text"
        fullWidth
      />
    </>
  );
}
