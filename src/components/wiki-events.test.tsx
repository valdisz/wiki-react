import React from 'react'
import { render, screen } from '../lib/test'
import { WikiEvent, WikiPage } from '../wiki'
import { WikiEvents } from './wiki-events'

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

describe('WikiEvents', () => {
    it('Renders list of items', () => {
        render(<WikiEvents items={[
            DATA, DATA, DATA
        ]} />)

        expect(screen.queryAllByRole('listitem')).toHaveLength(3)
    })

    it('Empty list renders container', () => {
        render(<WikiEvents items={[ ]} />)

        expect(screen.queryByRole('list')).toBeInTheDocument()
    })
})
