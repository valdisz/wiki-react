import React from 'react'
import { render, screen } from '../lib/test'
import { WikiEvent, WikiPage } from '../wiki'
import { WikiEventItem } from './wiki-event-item'

const DATA: WikiEvent = {
    text: 'Test',
    year: 2022,
    pages: [{
        title: 'title',
        thumbnail: {
            width: 1,
            height: 1,
            source: 'image'
        }
    } as WikiPage]
}

describe('TabStrip', () => {
    it('All item elements are visible', () => {
        render(<WikiEventItem item={DATA} />)

        expect(screen.queryByTestId('year')).toBeInTheDocument()
        expect(screen.queryByText('Test')).toBeInTheDocument()
        expect(screen.queryByRole('button')).toBeInTheDocument()
        expect(screen.queryByRole('figure')).toBeInTheDocument()
    })

    it('Year is not displayed if not given', () => {
        render(<WikiEventItem item={{
            ...DATA,
            year: null
        }} />)

        expect(screen.queryByTestId('year')).not.toBeInTheDocument()
        expect(screen.queryByText('Test')).toBeInTheDocument()
        expect(screen.queryByRole('button')).toBeInTheDocument()
        expect(screen.queryByRole('figure')).toBeInTheDocument()
    })

    it('Link and thumbnail is not displayed if no page is known', () => {
        render(<WikiEventItem item={{
            ...DATA,
            pages: []
        }} />)

        expect(screen.queryByTestId('year')).toBeInTheDocument()
        expect(screen.queryByText('Test')).toBeInTheDocument()
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
        expect(screen.queryByRole('figure')).not.toBeInTheDocument()
    })
})
