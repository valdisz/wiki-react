import React from 'react'
import { fireEvent, render, screen, waitFor } from '../lib/test'
import { MainViewModel } from '../model'
import { WikiClient } from '../wiki'
import Error from './error'

describe('Error', () => {
    let model: MainViewModel
    let client: WikiClient

    beforeEach(() => {
        client = new WikiClient()
        model = new MainViewModel(client)
    })

    it('no modal is shown when there is no error', () => {
        render(<Error />)
        const dialog = screen.queryByRole('dialog')

        expect(dialog).not.toBeInTheDocument()
    })

    it('no modal is shown when there is no error', () => {
        model.error.set('some error')

        render(<Error />, { model })
        const dialog = screen.queryByRole('dialog')

        expect(dialog).toBeInTheDocument()
    })

    it('Close button clears error', async () => {
        model.error.set('some error')

        render(<Error closeButtonTestId='closebtn' />, { model })

        const closeButton = screen.queryByTestId('closebtn')
        expect(closeButton).toBeInTheDocument()

        fireEvent.click(closeButton)

        await waitFor(() => {
            const dialog = screen.queryByRole('dialog')

            expect(dialog).not.toBeInTheDocument()
            expect(model.error.visible).toBe(false)
        })
    })
})
