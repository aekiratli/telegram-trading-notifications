import * as React from 'react';
import { Button, Dialog, Autocomplete, TextField, DialogActions, FormControl, Select, InputLabel, MenuItem, DialogContent, DialogTitle } from '@mui/material';
import { useFetchSymbols, useFetchChannels } from '../../api/queries';
import { MARKET, RISK } from '../../utils/binance';
import ApproveDialog from './ApproveDialog';

export default function AddDialog({ open, setOpen }) {

  const { data: symbolData, isLoading: isSymbolDataLoading } = useFetchSymbols()
  const { data: channelData, isLoading: isChannelDataLoading } = useFetchChannels()

  const [isApproveDialogOpen, setIsApproveDialogOpen] = React.useState(false)
  const [symbol, setSymbol] = React.useState({ 'name': '', id: 99999 })
  const [market, setMarket] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [risk, setRisk] = React.useState('')
  const [channels, setChannels] = React.useState(JSON.parse(localStorage.getItem("default_channel")) || []);

  const handleClose = () => {
    setOpen(false);
    setSymbol({ 'name': '', id: 99999 })
    setPrice('')
    setMarket('')
    setRisk('')
  };

  const handleAdd = (e) => {
    setIsApproveDialogOpen(true)
  };

  const handleSymbol = (e, value) => {
    if (!value)
      setSymbol({ 'name': '', id: 99999 })
    else
      setSymbol(value)
  };

  const handleMarket = (e, value) => {
    setMarket(e.target.value)
  };

  const handleRisk = (e, value) => {
    setRisk(e.target.value)
  };

  const handleChannels = (e, value) => {
    localStorage.setItem('default_channel', JSON.stringify(value))
    setChannels(value)
  };

  const handlePrice = (e) => {
    const value = e.target.value;
    if (/^\d*(\.\d{0,5})?$/.test(value)) {
      setPrice(value);
    }
  };

  if (isSymbolDataLoading || isChannelDataLoading)
    return (<></>)

  return (
    <React.Fragment>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New Order</DialogTitle>
        <DialogContent>

          <FormControl required fullWidth margin="dense">
            <Autocomplete
              disablePortal
              fullWidth
              id="symbo"
              options={symbolData}
              value={symbol}
              onChange={handleSymbol}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Symbol" />}
            />
          </FormControl>
          <FormControl required fullWidth margin="dense">
            <InputLabel id="market-label">Market</InputLabel>
            <Select onChange={handleMarket} label="market">
              {MARKET.map(side => {
                return <MenuItem key={side} value={side}>{side.toUpperCase()}</MenuItem>
              })}
            </Select>
          </FormControl>
          <TextField
            required
            autoFocus
            value={price}
            onChange={handlePrice}
            margin="dense"
            id="value"
            label="Price"
            type="text"
            fullWidth
          />
          <FormControl required fullWidth margin="dense">
            <InputLabel id="risk-label">Risk</InputLabel>
            <Select onChange={handleRisk} label="market">
              {RISK.map(item => {
                return <MenuItem key={item} value={item}>{item.toUpperCase()}</MenuItem>
              })}
            </Select>
          </FormControl>
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
                <TextField
                  {...params}
                  variant="outlined"
                  label="Channels"
                />
              )}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' disabled={channels.length < 1 || symbol.name.length < 2 || price.length < 1 || market.length < 2} onClick={handleAdd}>Add</Button>
          <Button variant='contained' onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <ApproveDialog
        symbol={symbol}
        price={price}
        risk={risk}
        channels={channels.map(channel => channel.id)}
        market={market}
        open={isApproveDialogOpen}
        setRisk={setRisk}
        setParentOpen={setOpen}
        setPrice={setPrice}
        setMarket={setMarket}
        setSymbol={setSymbol}
        setOpen_={setIsApproveDialogOpen} />
    </React.Fragment>
  );
}