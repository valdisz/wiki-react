import React from 'react'
import { useWikiClient } from '../wiki'
import { MainViewModel } from './main'

const modelContext = React.createContext<MainViewModel>(null)

export function useModel() {
    const ctx = React.useContext(modelContext)
    return ctx
}

export interface StoreProviderProps {
    model?: MainViewModel
    children: React.ReactNode
}

export function ModelProvider({ model, children }: StoreProviderProps) {
    const wiki = useWikiClient()
    const [ modelValue ] = React.useState(() => model || new MainViewModel(wiki))

    return <modelContext.Provider value={modelValue}>
        {children}
    </modelContext.Provider>
}
