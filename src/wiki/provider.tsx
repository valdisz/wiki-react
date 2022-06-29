import React from 'react'
import { WikiClient } from './client'

const wikiContext = React.createContext<WikiClient>(null)

export function useWikiClient() {
    const ctx = React.useContext(wikiContext)
    return ctx
}

export interface WikiProviderProps {
    client?: WikiClient
    children: React.ReactNode
}

export function WikiProvider({ client, children }: WikiProviderProps) {
    const [ clientValue ] = React.useState(() => client || new WikiClient())

    return <wikiContext.Provider value={clientValue}>
        {children}
    </wikiContext.Provider>
}
