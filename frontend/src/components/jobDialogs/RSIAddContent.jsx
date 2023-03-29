import * as React from 'react';
import { InputLabel, MenuItem, Select, FormControl, TextField } from '@mui/material';
import { INTERVALS } from '../../utils/binance';
import { useJobContext } from './JobContext';

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
  } = useJobContext()

  const handleInterval = (e) => {
    setInterval(e.target.value)
  };

  const handleSymbol = (e) => {
    setSymbol(e.target.value)
  };

  const handleName = (e) => {
    setName(e.target.value)
  };

  const handleValue = (e) => {
    if (/^\d*$/.test(e.target.value))
      setValue(e.target.value)
  };

  const handleCandles = (e) => {
    if (/^\d*$/.test(e.target.value))
      setCandles(e.target.value)
  };

  React.useEffect(() => {
    if (symbol && interval) {
      const intervalLabel = INTERVALS.find(interval_ => interval_.value === interval).label
      const suggestedName = symbol + '_' + jobType.toUpperCase() + '_' + intervalLabel.toUpperCase()
      setName(suggestedName)
    }
  }, [symbol, interval]);

  React.useEffect(() => {
    if (interval) {
      const minutes = INTERVALS.find(interal_ => interal_.value === interval).minutes
      const suggestedCandles = 720 / minutes
      if (suggestedCandles > 1)
        setCandles(suggestedCandles)
    }
  }, [interval]);

  return (
    <>
      <FormControl required fullWidth margin="dense">
        <InputLabel id="interval-label">Interval</InputLabel>
        <Select onChange={handleInterval} labelId="interval-label" id="interval" label="Interval">
          {INTERVALS.map(item => {
            return (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
          })}
        </Select>
      </FormControl>
      <FormControl required fullWidth margin="dense">
        <InputLabel id="symbol-label">Symbol</InputLabel>
        <Select onChange={handleSymbol} label="symbol">
          {symbolData.map(symbol => {
            return <MenuItem key={symbol.name} value={symbol.name}>{symbol.name}</MenuItem>
          })}
        </Select>
      </FormControl>
      <TextField
        required
        value={candles}
        onChange={handleCandles}
        margin="dense"
        id="candles"
        label="How Many Candles Needed"
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
  )
}