import React from 'react'
import { fireEvent, render, screen, waitFor } from '../lib/test'
import { MainViewModel } from '../model'
import { OnThisDayResponse, WikiClient } from '../wiki'
import Empty from './empty'

const EMPTY_RESPONSE: OnThisDayResponse = {
    selected: [],
    births: [],
    deaths: [],
    events: [],
    holidays: []
}

describe('Empty', () => {
    let model: MainViewModel
    let client: WikiClient
    let spyFetchOnThisDay: jest.SpyInstance

    beforeEach(() => {
        client = new WikiClient()

        spyFetchOnThisDay = jest.spyOn(client, 'fetchOnThisDay')
        spyFetchOnThisDay.mockReturnValue(Promise.resolve(EMPTY_RESPONSE))

        model = new MainViewModel(client)
    })

    it('button has focus on it', () => {
        render(<Empty />)
        const button = screen.getByRole('button')

        expect(button).toBeInTheDocument()
        expect(button).toHaveFocus()
    })

    it('no progress bar is visible', async () => {
        render(<Empty />, { model })
        const progressbar = screen.queryByRole('progressbar')

        expect(progressbar).not.toBeInTheDocument()
    })

    it('progressbar shows when button is clicked', () => {
        model.loading.start()

        render(<Empty />, { model })

        const progressbar = screen.getByRole('progressbar')

        expect(progressbar).toBeInTheDocument()
        expect(progressbar).toBeVisible()
    })

    it('button is disabled while loading', () => {
        model.loading.start()

        render(<Empty />, { model })
        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
    })

    it('button click triggers Wiki fetch', async () => {
        render(<Empty />, { model })

        const button = screen.getByRole('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(spyFetchOnThisDay).toBeCalledTimes(1)
        })
    })
})
