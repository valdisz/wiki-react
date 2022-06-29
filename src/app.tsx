import React from 'react'
import { AppContent } from './components'
import { WikiProvider } from './wiki'
import { ModelProvider } from './model'

export default function App() {
    return <WikiProvider>
        <ModelProvider>
            <AppContent />
        </ModelProvider>
    </WikiProvider>
}
