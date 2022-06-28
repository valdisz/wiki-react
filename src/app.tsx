import React from 'react'
import { AppContent } from './components'
import { ModelProvider } from './model'

export default function App() {
    return <ModelProvider>
        <AppContent />
    </ModelProvider>
}
