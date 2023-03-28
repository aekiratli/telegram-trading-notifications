import * as React from 'react';
import { InputLabel, MenuItem, Select, FormControl, TextField } from '@mui/material';
import { INTERVALS } from '../../utils/binance';
import { useJobContext } from './JobContext';
import apiFetch from '../../api/fetcher';
import { API_URL } from '../../api/urls';

export default function RSIAddContent() {
  const { symbolData, jobType } = useJobContext()
  const [interval, setInterval] = React.useState();
  const [symbol, setSymbol] = React.useState();
  const [candles, setCandles] = React.useState();

  const [name, setName] = React.useState('');

  const handleInterval = (e) => {
    setInterval(e.target.value)
  };

  const handleSymbol = (e) => {
    setSymbol(e.target.value)
  };

  const handleName = (e) => {
    setName(e.target.value)
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
        autoFocus
        onChange={handleCandles}
        margin="dense"
        id="candles"
        label="How Many Candles Needed"
        type="text"
        fullWidth
      />
      <TextField
        required
        autoFocus
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
        id="name"
        label="Name"
        type="text"
        fullWidth
      />
    </>
  )
}