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
    const [ defaultClient ] = React.useState(() => new WikiClient())

    return <wikiContext.Provider value={client ?? defaultClient}>
        {children}
    </wikiContext.Provider>
}
