import { MainViewModel } from './main'
import { WikiClient } from '../wiki'

jest.mock('../wiki')

const mocked = jest.mocked(WikiClient, true)

describe('MainViewModel', () => {

    let model: MainViewModel

    beforeEach(() => {
        mocked.mockClear()

        model = new MainViewModel(new WikiClient())
    })

    it('by default current day and month is used', () => {
        const today = new Date()

        expect(model.day.getDay()).toBe(today.getDay())
        expect(model.day.getMonth()).toBe(today.getMonth())
    })

    it('title is correctly formated', () => {
        model.day = new Date(2022, 0, 1, 0, 0, 0, 0)

        expect(model.title).toBe('day 1 of January')
    })

    it('initially data is not laoded', () => {
        expect(model.dataLoaded).toBe(false)
    })

    it('fetchOnThisDay calls WIKI client', () => {
        model.fetchOnThisDay()

        const m = mocked.mock.instances[0].fetchOnThisDay as jest.Mock
        expect(m).toBeCalledTimes(1)
    })
})
