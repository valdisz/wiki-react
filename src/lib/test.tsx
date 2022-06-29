import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { WikiProvider } from '../wiki'
import { MainViewModel, ModelProvider } from '../model'

export interface ProviderProps {
    model?: MainViewModel
}

export interface WithProvidersProps extends ProviderProps {
    children: React.ReactNode
}

const WithProviders: React.FC<WithProvidersProps> = ({ model, children }) => {
    return <WikiProvider>
        <ModelProvider store={model}>
            { children }
        </ModelProvider>
    </WikiProvider>
}

const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'> & ProviderProps,
) => render(ui, { wrapper: props => <WithProviders {...props} model={options?.model} />, ...options })

export * from '@testing-library/react'
export { customRender as render }
