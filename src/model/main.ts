import { action, computed, makeObservable, observable } from 'mobx'
import { WikiClient, WikiEvent } from '../wiki'
import type { OnThisDayResponse } from '../wiki'
import { ErrorViewModel } from './error';
import { LoadingViewModel } from './loading';
import { OnThisDayViewModel } from './on-this-day';

export class MainViewModel {
    constructor(private readonly wiki: WikiClient) {
        if (!wiki) {
            throw new Error('wiki client must be provided')
        }

        makeObservable(this)
    }

    readonly loading = new LoadingViewModel()
    readonly onThisDay = new OnThisDayViewModel();
    readonly error = new ErrorViewModel()

    @observable day = new Date()

    @computed get title() {
        return `day ${this.day.getDate()} of ${this.day.toLocaleString('en', { month: 'long' })}`
    }

    @observable dataLoaded = false

    readonly selected = observable<WikiEvent>([])
    readonly births = observable<WikiEvent>([])
    readonly deaths = observable<WikiEvent>([])
    readonly events = observable<WikiEvent>([])
    readonly holidays = observable<WikiEvent>([])

    readonly fetchOnThisDay = async () => {
        this.loading.start()

        const m = this.day.getMonth() + 1;
        const d = this.day.getDate();

        try {
            const daily = await this.wiki.fetchOnThisDay(m, d)
            this.acceptDailyArticles(daily)
        }
        catch (err) {
            this.error.set((err as Error).message)
        }
        finally {
            this.loading.stop()
        }
    }

    @action private acceptDailyArticles({ selected, births, deaths, events, holidays }: OnThisDayResponse) {
        this.selected.replace(selected)
        this.births.replace(births)
        this.deaths.replace(deaths)
        this.events.replace(events)
        this.holidays.replace(holidays)

        this.dataLoaded = true
    }
}
