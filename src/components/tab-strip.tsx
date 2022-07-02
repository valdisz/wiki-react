import React from 'react'
import { Tabs, Tab } from '@mui/material'
import { observer } from 'mobx-react'
import { useModel } from '../model'

function TabStrip() {
    const { onThisDay } = useModel()

    return <Tabs value={onThisDay.currentTab} onChange={onThisDay.open}>
        <Tab label='Selected' value='selected' />
        <Tab label='Births' value='births' />
        <Tab label='Deaths' value='deaths' />
        <Tab label='Events' value='events' />
        <Tab label='Holidays' value='holidays' />
    </Tabs>
}

export default observer(TabStrip)
