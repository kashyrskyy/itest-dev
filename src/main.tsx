import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <App />
    </SnackbarProvider>
  </StrictMode>,
)
