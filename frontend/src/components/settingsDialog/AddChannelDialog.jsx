import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useAppContext } from '../../AppContext';
import apiFetch from '../../api/fetcher';
import { API_URL } from '../../api/urls';
import { useQueryClient } from 'react-query';

export default function AddDialog({ open, setOpen }) {
  const queryClient = useQueryClient();
  const { setSnackbar } = useAppContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [chatId, setChatId] = React.useState('');

  const handleClose = () => {
    setOpen(false);
    setName('');
    setChatId('');
  };

  const handleAdd = (e) => {
    setIsLoading(true);
    apiFetch(API_URL.addChannel(), {
      name: name,
      chat_id: parseInt(chatId),
    })
      .then((response) => {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ['list_channels'] });
        setName('');
        setChatId('');
        setSnackbar({
          open: true,
          message: 'Channel is Added',
          type: 'success',
        });
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

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleChatID = (e) => {
    if (/^-?\d+$/.test(e.target.value)) setChatId(e.target.value);
  };

  return (
    <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle>Add New Channel</DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          margin="dense"
          id="value"
          value={name}
          onChange={handleName}
          label="Name"
          type="text"
          fullWidth
        />
        <TextField
          required
          autoFocus
          margin="dense"
          label="Chat ID"
          value={chatId}
          onChange={handleChatID}
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={isLoading || name.length < 1 || chatId.length < 1}
          onClick={handleAdd}
        >
          Add
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
