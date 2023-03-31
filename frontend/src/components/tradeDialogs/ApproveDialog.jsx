import * as React from 'react';
import { Button, Dialog, TableContainer, TableBody, Table, TableCell, TableRow ,Autocomplete, TextField, DialogActions, FormControl, Select, InputLabel, MenuItem, DialogContent, DialogTitle } from '@mui/material';

export default function ApproveDialog({ open, setOpen, market, price, symbol, channels }) {
    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (e) => {
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
                                <TableCell>{symbol}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Market:</TableCell>
                                <TableCell>{market}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleAdd}>Approve</Button>
                <Button variant='contained' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}