import React from 'react'
import { Typography, IconButton, Box } from '@mui/material'
import { WikiEvent } from '../wiki'
import LinkIcon from '@mui/icons-material/Link'


export interface WikiEventItemProps {
    item: WikiEvent
}

export function WikiEventItem({ item }: WikiEventItemProps) {
    const page = item.pages?.length ? item.pages[0] : null

    return <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ':hover': {
            bgcolor: 'ButtonHighlight'
        }
    }}>
        <Box sx={{ flex: 1, display: 'flex' }}>
            { !!page?.thumbnail?.source
                ? <Box sx={{ width: '120px', height: '120px', backgroundImage: `url(${page.thumbnail.source})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
                : <Box sx={{ width: '120px', height: '120px' }} />
            }
            <Box sx={{ flex: 1, p: 2}}>
                { !!item.year && <Typography variant='caption'>{item.year}</Typography> }
                <Typography>{item.text}</Typography>
            </Box>
        </Box>
        { !!page && <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mr: 2
            }}>
                <IconButton component='a' target='_blank' href={`https://en.wikipedia.org/wiki/${page.title}`}>
                    <LinkIcon />
                </IconButton>
            </Box> }
    </Box>
}
