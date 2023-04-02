import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  TableBody,
  Table,
  TableCell,
  DialogContent,
  TableRow,
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import apiFetch from '../../api/fetcher';
import { API_URL } from '../../api/urls';
import { useQueryClient } from 'react-query';
import { useAppContext } from '../../AppContext';
import { convertTimestampToDate } from '../../utils/dates';

export default function DeleteDialog({ open, setOpen, trade }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const { setSnackbar } = useAppContext();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setIsLoading(true);
    apiFetch(API_URL.deleteTrade(trade.id))
      .then((response) => {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ['list_trades'] });
        setSnackbar({ open: true, message: 'Deleted', type: 'success' });
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: 'Something went wrong',
          type: 'error',
        });
      })
      .finally((error) => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Deleting Trade</DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Symbol:</b>
              </TableCell>
              <TableCell>{trade?.symbol}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Market:</b>
              </TableCell>
              <TableCell>{trade?.market?.toUpperCase()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Price:</b>
              </TableCell>
              <TableCell>{trade?.price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Date:</b>
              </TableCell>
              <TableCell>{convertTimestampToDate(trade?.date)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={isLoading} onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
