import React from 'react'
import { Typography, Box, Container } from '@mui/material'
import TabStrip from './tab-strip'
import TabBody from './tab-body'

export default function OnThisDay() {
    return <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'white'
        }}>
            <Container>
                <Typography variant='h5'>On this day</Typography>
                <TabStrip />
            </Container>
        </Box>

        <Box sx={{
            flex: 1,
            minHeight: 0
        }}>
            <Box sx={{
                height: '100%',
                overflow: 'auto'
            }}>
                <Container sx={{ p: 2 }}>
                    <TabBody />
                </Container>
            </Box>
        </Box>
    </Box>
}
