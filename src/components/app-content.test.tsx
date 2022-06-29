import React from 'react'
import Helmet from 'react-helmet'
import { render, screen } from '../lib/test'
import { MainViewModel } from '../model'
import { WikiClient } from '../wiki'
import AppContent from './app-content'

describe('Empty', () => {
    let model: MainViewModel
    let client: WikiClient

    beforeEach(() => {
        client = new WikiClient()
        model = new MainViewModel(client)
    })

    it('intially empty state is shown', () => {
        render(<AppContent />)
        const button = screen.queryByRole('button')
        const tabs = screen.queryByRole('tablist')

        expect(button).toBeInTheDocument()
        expect(tabs).not.toBeInTheDocument()
    })

    it('when data is loaded, then tabs are shwon', () => {
        model.dataLoaded = true

        render(<AppContent />, { model })
        const button = screen.queryByRole('button')
        const tabs = screen.queryByRole('tablist')

        expect(button).not.toBeInTheDocument()
        expect(tabs).toBeInTheDocument()
    })

    it('site title includes day and month', () => {
        render(<AppContent />, { model })

        const state = Helmet.peek()

        expect(Array.isArray(state.title) ? state.title.join('') : state.title)
            .toBe(`On the ${model.title}`)
    })
})
