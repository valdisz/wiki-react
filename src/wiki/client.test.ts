import { WikiClient } from './client'
import { OnThisDayResponse } from './on-this-day-response'

const RESPONSE: OnThisDayResponse = {
    births: [],
    deaths: [],
    events: [],
    holidays: [],
    selected: []
}

const mockFetch: jest.Mock = jest.fn()
global.fetch = mockFetch

describe('WikiClient', () => {
    let client: WikiClient

    beforeEach(() => {
        mockFetch.mockClear()
        client = new WikiClient()
    })

    it('calls fetch', async () => {
        mockFetch.mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve(RESPONSE)
        }))

        await client.fetchOnThisDay(0, 1)

        expect(mockFetch).toBeCalledTimes(1)
    })

    it('on success will return an expected response', async () => {
        mockFetch.mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve(RESPONSE)
        }))

        const res = await client.fetchOnThisDay(0, 1)

        expect(res).toBe(RESPONSE)
    })

    it('when server not reacheable will reject promise with Error', async () => {
        mockFetch.mockReturnValueOnce(Promise.reject())

        await expect(client.fetchOnThisDay(0, 1))
            .rejects
            .toThrowError()
    })

    it('throws on 404 status code', async () => {
        mockFetch.mockReturnValueOnce(Promise.resolve({
            ok: false,
            status: 404
        }))

        await expect(client.fetchOnThisDay(0, 1))
            .rejects
            .toThrowError(`There were no 'On this day' content`)
    })

    it('throws on 4xx status code', async () => {
        mockFetch.mockReturnValueOnce(Promise.resolve({
            ok: false,
            status: 401
        }))

        await expect(client.fetchOnThisDay(0, 1))
            .rejects
            .toThrowError(`Invalid request to the Wikipedia server`)
    })

    it('throws on 5xx status code', async () => {
        mockFetch.mockReturnValueOnce(Promise.resolve({
            ok: false,
            status: 500
        }))

        await expect(client.fetchOnThisDay(0, 1))
            .rejects
            .toThrowError(`Wikipedia server was not abel to process this request`)
    })

    it('throws on failed response', async () => {
        mockFetch.mockReturnValueOnce(Promise.resolve({
            ok: false
        }))

        await expect(client.fetchOnThisDay(0, 1))
            .rejects
            .toThrowError(`Unknown server error`)
    })
})
