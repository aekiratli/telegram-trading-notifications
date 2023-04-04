import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material';

export default function LogDialog({ open, setOpen, job }) {
  const socketRef = React.useRef(null);
  const [logs, setLogs] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
    setLogs([]);
  };

  React.useEffect(() => {
    if (open) {
      const socketUrl = `${process.env.REACT_APP_WS_URL}/ws/logs/${job?.name}`;
      const socket = new WebSocket(socketUrl);

      socketRef.current = socket;

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            headers: {
              Bearer: localStorage.getItem('token'),
            },
          })
        );
      };

      socket.onmessage = (event) => {
        setLogs((prevLogs) => {
          // Remove the first element if the array length is already 50
          if (prevLogs.length === 20) {
            return [...prevLogs.slice(1), event.data];
          }
          // Otherwise, just add the new line to the end of the array
          return [...prevLogs, event.data];
        });
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } else {
      if (socketRef.current) {
        socketRef.current.close();
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        setLogs([]);
      }
    };
  }, [open, job?.name]);

  return (
    <Dialog maxWidth="lg" fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        {'Logs of ' + job?.name}
      </DialogTitle>
      <DialogContent style={{ backgroundColor: 'black' }}>
        <>
          <DialogContentText
            style={{ color: 'white' }}
            id="alert-dialog-description"
          >
            {logs.map((line, index) => (
              <div key={index}>
                {line.split('\n').map((i, key) => {
                  return <div key={key}>{i}</div>;
                })}
              </div>
            ))}
          </DialogContentText>
        </>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
