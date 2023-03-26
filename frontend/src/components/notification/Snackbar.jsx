import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { AppContext } from '../../App';


export default function SnackbarController() {
    const { snackbar, setSnackbar } = useContext(AppContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity={snackbar.type}>
            {snackbar.message}
          </Alert>
        </Snackbar>
    );
}
