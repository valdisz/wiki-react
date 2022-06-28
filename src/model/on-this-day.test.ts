import { OnThisDayViewModel } from './on-this-day'

describe('OnThisDayViewModel', () => {
    let model: OnThisDayViewModel

    beforeEach(() => {
        model = new OnThisDayViewModel()
    })

    it('initial selected tab is `selected`', () => {
        expect(model.currentTab).toBe('selected')
    })

    it('open changes tab to the desired one', () => {
        model.open(null, 'events')
        expect(model.currentTab).toBe('events')
    })
})
