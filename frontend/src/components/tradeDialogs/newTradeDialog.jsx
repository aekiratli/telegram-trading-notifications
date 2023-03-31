import * as React from 'react';
import { Button, Dialog, Autocomplete, TextField, DialogActions, FormControl, Select, InputLabel, MenuItem, DialogContent, DialogTitle } from '@mui/material';
import { useAppContext } from '../../AppContext';
import apiFetch from '../../api/fetcher';
import { API_URL } from '../../api/urls';
import { useQueryClient } from 'react-query';
import { useFetchSymbols, useFetchChannels } from '../../api/queries';
import { MARKET } from '../../utils/binance';
import ApproveDialog from './ApproveDialog';

export default function AddDialog({ open, setOpen }) {

  const { data: symbolData, isLoading: isSymbolDataLoading } = useFetchSymbols()
  const { data: channelData, isLoading: isChannelDataLoading } = useFetchChannels()
  const [isApproveDialogOpen, setIsApproveDialogOpen] = React.useState(false)

  const queryClient = useQueryClient()
  const { setSnackbar } = useAppContext()
  const [isLoading, setIsLoading] = React.useState(false)
  const [symbol, setSymbol] = React.useState({ 'name': '', id: 99999 })
  const [market, setMarket] = React.useState('')
  const [price, setPrice] = React.useState('')

  const [channels, setChannels] = React.useState(JSON.parse(localStorage.getItem("default_channel")) || []);

  const handleClose = () => {
    setOpen(false);
    setSymbol({ 'name': '', id: 99999 })
  setPrice('')
setMarket('')  };

  const handleAdd = (e) => {
    setIsApproveDialogOpen(true)
    // setIsLoading(true)
    // apiFetch(API_URL.addChannel(), {
    //     name: name,
    //     chat_id: parseInt(chatId)
    // })
    //     .then(response => {
    //         setOpen(false)
    //         queryClient.invalidateQueries({ queryKey: ['list_channels'] })
    //         setName('')
    //         setChatId('')
    //         setSnackbar({ open: true, message: "Channel is Added", type: 'success' })
    //     })
    //     .catch(error => {
    //         setSnackbar({ open: true, message: "Something went wrong", type: 'error' })
    //     })
    //     .finally(error => {
    //         setIsLoading(false)
    //     });
  };


  const handleSymbol = (e, value) => {
    if (!value)
      setSymbol({ 'name': '', id: 99999 })
    else
      setSymbol({ 'name': value.name, id: 99999 })
  };


  const handleMarket = (e, value) => {
    setMarket(e.target.value)
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
                return <MenuItem key={side} value={side}>{side}</MenuItem>
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
          <Button variant='contained' disabled={isLoading || channels.length < 1 || symbol.name.length < 2 || price.length < 1 || market.length < 2} onClick={handleAdd}>Add</Button>
          <Button variant='contained' onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <ApproveDialog
        symbol={symbol.name}
        price={price}
        channels={channels.map(channel => channel.id)}
        market={market}
        open={isApproveDialogOpen}
        setOpen={setIsApproveDialogOpen} />
    </React.Fragment>
  );
}