import React from 'react'
import { Helmet } from 'react-helmet'
import { Container } from '@mui/material'

export default function App() {
    return <>
        <Helmet>
            <meta charSet='utf-8' />
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width,initial-scale=1,shrink-to-fit=no' />
        </Helmet>
        <Container>App</Container>
    </>
}
