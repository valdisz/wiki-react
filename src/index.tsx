import React from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { WikiProvider } from './wiki'
import App from './app'
import 'regenerator-runtime/runtime'

const host = document.getElementById('app')
const root = createRoot(host)
root.render(<CssBaseline>
    <WikiProvider>
        <App />
    </WikiProvider>
</CssBaseline>);

// Hot Module Replacement API
declare const module: { hot: any };
if (module && module.hot) {
    module.hot.accept()
}
