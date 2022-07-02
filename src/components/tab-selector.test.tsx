import React from 'react'
import { render, screen } from '../lib/test'
import { WikiEvent, WikiPage } from '../wiki'
import { TabSelector } from './tab-selector'

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

describe('TabSelector', () => {
    it('Renders corresponsign active tab', () => {
        render(<TabSelector activeTab='selected' children={[
            { name: 'selected', body: <div>selected</div> },
            { name: 'holidays', body: <div>holidays</div> },
        ]} />)

        expect(screen.queryByText('selected')).toBeInTheDocument()
    })

    it('If no tabs with activeTab names present, nothing is rendered', () => {
        render(<TabSelector activeTab='events' children={[
            { name: 'selected', body: <div>selected</div> },
            { name: 'holidays', body: <div>holidays</div> },
        ]} />)

        expect(screen.queryByText('selected')).not.toBeInTheDocument()
        expect(screen.queryByText('holidays')).not.toBeInTheDocument()
    })
})
