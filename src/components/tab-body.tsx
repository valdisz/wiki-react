import React from 'react'
import { observer } from 'mobx-react'
import { useModel } from '../model'
import { TabSelector } from './tab-selector'
import { WikiEvents } from './wiki-events'

function TabBody() {
    const model = useModel()

    return <TabSelector activeTab={model.onThisDay.currentTab}>
        {[
            { name: 'selected', body: <WikiEvents items={model.selected} /> },
            { name: 'births', body: <WikiEvents items={model.births} /> },
            { name: 'deaths', body: <WikiEvents items={model.deaths} /> },
            { name: 'events', body: <WikiEvents items={model.events} /> },
            { name: 'holidays', body: <WikiEvents items={model.holidays} /> },
        ]}
    </TabSelector>
}

export default observer(TabBody)
