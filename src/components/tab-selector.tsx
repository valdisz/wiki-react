import React from 'react'
import { OnThisDayTabName } from '../model'

export interface TabDefinition {
    name: OnThisDayTabName
    body: React.ReactNode
}

export interface TabSelectorProps {
    activeTab: OnThisDayTabName
    children: TabDefinition[]
}

export function TabSelector({ activeTab, children }: TabSelectorProps) {
    const tab = children.find(x => x.name === activeTab)
    return tab
        ? <>{tab.body}</>
        : null
}
