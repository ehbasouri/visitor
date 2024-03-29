import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

export function AlertComponent({
    message = "hello",
    open, setOpen,
    severity = "error"
}) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
  };

  return (
    <div>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: "center" ,
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message={message}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        >
            <Alert variant="filled" severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    </div>
  );
}
