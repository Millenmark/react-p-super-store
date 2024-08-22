import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { SnackbarProvider } from './contexts/snackbar-context';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
