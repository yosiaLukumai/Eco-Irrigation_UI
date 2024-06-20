import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState, useRef, useEffect } from 'react';

const AlertDialog = ({ show = false, time = 3000, type = "success", msg = "sorryDear", NotifyParent, vertical="top", horizontal="center" }) => {
  const snackbarRef = useRef(null);

  const [isOpen, setIsOpen] = useState(show);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
    NotifyParent()
  };

  useEffect(() => {
    if (show) { 
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [show]);

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={time}
        onClose={handleClose}
        ref={snackbarRef} 
        sx={{px:'2.1rem'}}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%',fontSize:"0.9rem", fontWeight:"bold" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AlertDialog;