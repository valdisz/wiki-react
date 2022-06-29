import React from 'react'
import { Tabs, Tab } from '@mui/material'
import { observer } from 'mobx-react'
import { useModel } from '../model'

function TabStrip() {
    const { onThisDay } = useModel()

    return <Tabs value={onThisDay.currentTab} onChange={onThisDay.open}>
        <Tab label='Selected' value='selected' />
        <Tab label='births' value='births' />
        <Tab label='deaths' value='deaths' />
        <Tab label='events' value='events' />
        <Tab label='holidays' value='holidays' />
    </Tabs>
}

export default observer(TabStrip)
