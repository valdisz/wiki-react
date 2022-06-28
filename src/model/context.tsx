import React from 'react'
import { useWikiClient } from '../wiki'
import { MainViewModel } from './main'

const modelContext = React.createContext<MainViewModel>(null)

export function useModel() {
    const ctx = React.useContext(modelContext)
    return ctx
}

export interface StoreProviderProps {
    store?: MainViewModel
    children: React.ReactNode
}

export function ModelProvider({ store, children }: StoreProviderProps) {
    const wiki = useWikiClient()
    const [defaultStore] = React.useState(() => new MainViewModel(wiki))

    return <modelContext.Provider value={store ?? defaultStore}>
        {children}
    </modelContext.Provider>
}
