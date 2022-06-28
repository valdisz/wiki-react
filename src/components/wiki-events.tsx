import React from 'react'
import { Box, useTheme } from '@mui/material'
import { WikiEvent } from '../wiki'
import { WikiEventItem } from './wiki-event-item'

export interface WikiEventsProps {
    items: WikiEvent[]
}

export function WikiEvents({ items }: WikiEventsProps) {
    const { spacing } = useTheme()

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(1)
    }}>
        {items.map((x, i) => <WikiEventItem key={i} item={x} />)}
    </Box>
}
