import { OnThisDayResponse } from "./on-this-day-response";

export class FetchError extends Error {
    constructor(msg: string, public readonly errorCode: number) {
        super(msg)

        Object.setPrototypeOf(this, FetchError.prototype);
    }
}

export class WikiClient {
    async fetchDailyArticles(month: number, day: number): Promise<OnThisDayResponse> {
        const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`

        let res: Response
        try {
            res = await fetch(url)
        }
        catch (err) {
            throw new Error('Was not able to reach Wikipedia servers. Please check your Internet connection.')
        }

        if (!res.ok) {
            if (res.status === 404) {
                throw new FetchError(res.statusText || `There were no 'On this day' content`, res.status)
            }

            if (res.status >= 400 && res.status <= 499) {
                throw new FetchError(res.statusText || 'Invalid request to the Wikipedia server', res.status)
            }

            if (res.status >= 500 && res.status <= 599) {
                throw new FetchError(res.statusText || 'Wikipedia server was not abel to process this request', res.status)
            }

            throw new FetchError(res.statusText || 'Unknown server error', res.status)
        }

        const value = await res.json()
        return value
    }
}
