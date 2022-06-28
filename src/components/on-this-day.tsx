import React from 'react'
import { Typography, Box, Tabs, Tab, Container } from '@mui/material'
import { observer } from 'mobx-react'
import { useModel } from '../model'
import { TabSelector } from './tab-selector'
import { WikiEvents } from './wiki-events'

function OnThisDay() {
    const store = useModel()
    const { onThisDay } = store

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
                <Box>
                    <Typography variant='h5'>On this day</Typography>
                </Box>
                <Tabs value={onThisDay.currentTab} onChange={onThisDay.open}>
                    <Tab label='Selected' value='selected' />
                    <Tab label='births' value='births' />
                    <Tab label='deaths' value='deaths' />
                    <Tab label='events' value='events' />
                    <Tab label='holidays' value='holidays' />
                </Tabs>
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
                    <TabSelector activeTab={onThisDay.currentTab}>
                        {[
                            { name: 'selected', body: <WikiEvents items={store.selected} /> },
                            { name: 'births', body: <WikiEvents items={store.births} /> },
                            { name: 'deaths', body: <WikiEvents items={store.deaths} /> },
                            { name: 'events', body: <WikiEvents items={store.events} /> },
                            { name: 'holidays', body: <WikiEvents items={store.holidays} /> },
                        ]}
                    </TabSelector>
                </Container>
            </Box>
        </Box>
    </Box>
}

export default observer(OnThisDay)
