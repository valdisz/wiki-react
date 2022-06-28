import { action, makeObservable, observable } from 'mobx'
import { OnThisDayResponse } from '../wiki'

export type OnThisDayTabName = keyof OnThisDayResponse

export class OnThisDayViewModel {
    constructor() {
        makeObservable(this)
    }

    @observable currentTab: OnThisDayTabName = 'selected'

    @action readonly open = (event: React.SyntheticEvent<Element, Event>, tab: OnThisDayTabName) => this.currentTab = tab
}
