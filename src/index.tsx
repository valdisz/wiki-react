import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import App from './app'

const host = document.getElementById('app')
ReactDOM.render(<CssBaseline>
    <App />
</CssBaseline>, host)

// Hot Module Replacement API
declare const module: { hot: any };
if (module && module.hot) {
    module.hot.accept()
}
