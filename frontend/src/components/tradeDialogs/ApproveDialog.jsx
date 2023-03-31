import * as React from 'react';
import { Button, Dialog, TableContainer, 
  TableBody, Table, TableCell, TableRow, DialogActions,
    DialogContent, DialogTitle } from '@mui/material';
import apiFetch from '../../api/fetcher'
import {API_URL} from '../../api/urls'
import { useQueryClient } from 'react-query';
import { useAppContext } from '../../AppContext';


export default function ApproveDialog({ open, setOpen_, market, price, symbol, channels, risk, setParentOpen, setMarket, setPrice, setSymbol, setRisk }) {
  const handleClose = () => {
    setOpen_(false);
  };

  const queryClient = useQueryClient()
  const { setSnackbar } = useAppContext()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleAdd = () => {
    const payload = {
      price: parseFloat(price),
      symbol_id:  symbol.id,
      risk: risk,
      channels: channels,
      market: market,
    }
    setIsLoading(true)
    apiFetch(API_URL.addTrade(), payload)
        .then(response => {
            setOpen_(false)
            setParentOpen(false)
            setRisk('')
            setMarket('')
            setSymbol({name:'', id: 99999})
            setPrice('')
            queryClient.invalidateQueries({ queryKey: ['list_trades'] })
            setSnackbar({ open: true, message: "Trade is Added", type: 'success' })
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
      <DialogTitle>Approve Order</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Price:</TableCell>
                <TableCell>{price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Symbol:</TableCell>
                <TableCell>{symbol.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Market:</TableCell>
                <TableCell>{market.toUpperCase()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} variant='contained' onClick={handleAdd}>Approve</Button>
        <Button variant='contained' onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}