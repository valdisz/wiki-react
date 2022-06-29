import { MainViewModel } from './main'
import { OnThisDayResponse, WikiClient } from '../wiki'

const EMPTY_RESPONSE: OnThisDayResponse = {
    selected: [],
    births: [],
    deaths: [],
    events: [],
    holidays: []
}

const RESPONSE: OnThisDayResponse = {
    selected: [
        { text: 'test', pages: [] },
        { text: 'test', pages: [] },
        { text: 'test', pages: [] },
        { text: 'test', pages: [] },
        { text: 'test', pages: [] }
    ],
    births: [
        { text: 'test', pages: [] },
        { text: 'test', pages: [] },
        { text: 'test', pages: [] },
        { text: 'test', pages: [] }
    ],
    deaths: [
        { text: 'test', pages: [] },
        { text: 'test', pages: [] },
        { text: 'test', pages: [] }
    ],
    events: [
        { text: 'test', pages: [] },
        { text: 'test', pages: [] },
    ],
    holidays: [
        { text: 'test', pages: [] },
    ],
}


class ControllablePromise<T> {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolver = resolve
            this.rejecter = reject
        })
    }

    private resolver: (value: T | PromiseLike<T>) => void
    private rejecter: (reason?: any) => void

    readonly promise: Promise<T>

    resolve(value: T) {
        this.resolver(value)
    }

    reject(reason?: any) {
        this.rejecter(reason)
    }
}

describe('MainViewModel', () => {
    let model: MainViewModel
    let client: WikiClient
    let spyFetchOnThisDay: jest.SpyInstance

    beforeEach(() => {
        client = new WikiClient()

        spyFetchOnThisDay = jest.spyOn(client, 'fetchOnThisDay')
        spyFetchOnThisDay.mockReturnValue(Promise.resolve(EMPTY_RESPONSE))

        model = new MainViewModel(client)
    })

    it('will fail if wiki client not given', () => {
        const action = () => new MainViewModel(null)
        expect(action).toThrowError()
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

        expect(spyFetchOnThisDay).toBeCalledTimes(1)
    })

    it('successfull fetchOnThisDay sets data to be loaded', async () => {
        await model.fetchOnThisDay()

        expect(model.dataLoaded).toBe(true)
    })

    it('fetch changes loading state', async () => {
        const req = new ControllablePromise<OnThisDayResponse>()
        spyFetchOnThisDay.mockReturnValue(req.promise)

        expect(model.loading.isLoading).toBe(false)

        const promise = model.fetchOnThisDay()
        expect(model.loading.isLoading).toBe(true)

        req.resolve(EMPTY_RESPONSE)
        await promise

        expect(model.loading.isLoading).toBe(false)
    })

    it('fetch with exception will set error', async () => {
        spyFetchOnThisDay.mockReturnValue(Promise.reject(new Error('this is error')))

        await model.fetchOnThisDay()

        expect(model.error.message).toBe('this is error')
    })

    it('fetch with error leaves loading state to as not loading', async () => {
        const req = new ControllablePromise<OnThisDayResponse>()
        spyFetchOnThisDay.mockReturnValue(req.promise)

        expect(model.loading.isLoading).toBe(false)

        const promise = model.fetchOnThisDay()
        expect(model.loading.isLoading).toBe(true)

        req.reject(new Error('this is error'))
        await promise

        expect(model.loading.isLoading).toBe(false)
    })

    it('fetch sets data model values', async () => {
        spyFetchOnThisDay.mockReturnValue(Promise.resolve(RESPONSE))

        await model.fetchOnThisDay()

        expect(model.selected.length).toBe(RESPONSE.selected.length)
        expect(model.births.length).toBe(RESPONSE.births.length)
        expect(model.deaths.length).toBe(RESPONSE.deaths.length)
        expect(model.events.length).toBe(RESPONSE.events.length)
        expect(model.holidays.length).toBe(RESPONSE.holidays.length)
    })
})
