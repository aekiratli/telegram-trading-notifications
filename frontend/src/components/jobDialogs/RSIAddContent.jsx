/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextField,
} from '@mui/material';
import { INTERVALS } from '../../utils/binance';
import { useJobContext } from './JobContext';
import { Autocomplete } from '@mui/material';

export default function RSIAddContent() {
  const {
    symbolData,
    jobType,
    interval,
    setInterval,
    symbol,
    setSymbol,
    candles,
    setCandles,
    name,
    setName,
    value,
    setValue,
    channelData,
    setChannels,
    channels,
    resetCandles,
    setResetCandles,
    message,
    setMessage,
  } = useJobContext();

  const handleInterval = (e) => {
    setInterval(e.target.value);
  };

  const handleSymbol = (e) => {
    setSymbol(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleValue = (e) => {
    if (/^\d*$/.test(e.target.value)) setValue(e.target.value);
  };

  const handleCandles = (e) => {
    if (/^\d*$/.test(e.target.value)) setCandles(e.target.value);
  };

  const handleResetCandles = (e) => {
    if (/^\d*$/.test(e.target.value)) setResetCandles(e.target.value);
  };

  const handleChannels = (e, value) => {
    setChannels(value);
  };

  React.useEffect(() => {
    if (symbol && interval) {
      const intervalLabel = INTERVALS.find(
        (interval_) => interval_.value === interval
      ).label;
      const suggestedName =
        symbol +
        '_' +
        jobType.toUpperCase() +
        '_' +
        intervalLabel.toUpperCase();
      setName(suggestedName);
    }
  }, [symbol, interval, jobType]);

  React.useEffect(() => {
    if (name.length > 0) {
      const suggestedMsg = `➡️ RSI Alert for ${name} ⬅️`;
      setMessage(suggestedMsg);
    }
  }, [name]);

  React.useEffect(() => {
    if (interval) {
      // const minutes = INTERVALS.find(
      //   (interal_) => interal_.value === interval
      // ).minutes;
      //const suggestedCandles = 720 / minutes
      const suggestedCandles = 16;
      if (suggestedCandles > 1) setCandles(suggestedCandles);
    }
  }, [interval]);

  return (
    <>
      <FormControl required fullWidth margin="dense">
        <InputLabel id="interval-label">Interval</InputLabel>
        <Select
          onChange={handleInterval}
          labelId="interval-label"
          id="interval"
          label="Interval"
        >
          {INTERVALS.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl required fullWidth margin="dense">
        <InputLabel id="symbol-label">Symbol</InputLabel>
        <Select onChange={handleSymbol} label="symbol">
          {symbolData.map((symbol) => {
            return (
              <MenuItem key={symbol.name} value={symbol.name}>
                {symbol.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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
      <TextField
        required
        value={name}
        autoFocus
        onChange={handleName}
        margin="dense"
        label="Name"
        type="text"
        fullWidth
      />
    </>
  );
}
