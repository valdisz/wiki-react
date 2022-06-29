import React from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import App from './app'
import reportWebVitals from './reportWebVitals';

const host = document.getElementById('app')
const root = createRoot(host)
root.render(<CssBaseline>
    <App />
</CssBaseline>)

reportWebVitals()
