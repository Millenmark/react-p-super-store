import React, { createContext, useState, useCallback } from 'react';
import { Snackbar, Slide, Alert } from '@mui/material';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [snackbarPosition, setSnackbarPosition] = useState({ vertical: 'top', horizontal: 'left' });
  const [snackbarDirection, setSnackbarDirection] = useState('right');
  const [withCloseButton, setWithCloseButton] = useState(false);

  const alertSnackbar = useCallback(
    (message, severity = 'info', position = 'topLeft', withClose) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
      setWithCloseButton(withClose);

      switch (position) {
        case 'topLeft':
          setSnackbarPosition({ vertical: 'top', horizontal: 'left' });
          setSnackbarDirection('right');
          break;
        case 'topRight':
          setSnackbarPosition({ vertical: 'top', horizontal: 'right' });
          setSnackbarDirection('left');
          break;
        case 'topCenter':
          setSnackbarPosition({ vertical: 'top', horizontal: 'center' });
          setSnackbarDirection('down');
          break;
        case 'bottomLeft':
          setSnackbarPosition({ vertical: 'bottom', horizontal: 'left' });
          setSnackbarDirection('right');
          break;
        case 'bottomRight':
          setSnackbarPosition({ vertical: 'bottom', horizontal: 'right' });
          setSnackbarDirection('left');
          break;
        case 'bottomCenter':
          setSnackbarPosition({ vertical: 'bottom', horizontal: 'center' });
          setSnackbarDirection('up');
          break;
      }
    },
    []
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const value = { alertSnackbar };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        anchorOrigin={snackbarPosition}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        TransitionComponent={(props) => <Slide {...props} direction={snackbarDirection} />}
        autoHideDuration={3000}
      >
        <Alert
          {...(() => withCloseButton && { onClose: handleSnackbarClose })()}
          severity={snackbarSeverity}
          sx={{ width: '100%', fontWeight: 700 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
