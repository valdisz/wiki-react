import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '../lib/test'
import { MainViewModel } from '../model'
import { WikiClient } from '../wiki'
import TabStrip from './tab-strip'

describe('TabStrip', () => {
    let model: MainViewModel

    beforeEach(() => {
        model = new MainViewModel(new WikiClient())
    })

    it('Selected tab must be active at start', () => {
        render(<TabStrip />, { model })

        const tab = screen.queryByText(/Selected/i)

        expect(tab).toBeInTheDocument()
        expect(tab).toHaveClass('Mui-selected')
    })

    it('Can open correct tab', async () => {
        render(<TabStrip />, { model })

        act(() => {
            model.onThisDay.open(null, 'events')
        })

        await waitFor(() => {
            const tab = screen.queryByText(/Events/i)

            expect(tab).toBeInTheDocument()
            expect(tab).toHaveClass('Mui-selected')
        })
    })

    it('Clicking on tab activates it', async () => {
        render(<TabStrip />, { model })

        const tab = screen.queryByText(/Holidays/i)

        fireEvent.click(tab)

        await waitFor(() => {
            expect(tab).toBeInTheDocument()
            expect(tab).toHaveClass('Mui-selected')
        })
    })
})
