import { action, computed, makeObservable, observable } from 'mobx'

export class ErrorViewModel {
    constructor() {
        makeObservable(this)
    }

    @observable message: string = null

    @computed get visible() {
        return !!this.message
    }

    @action readonly dismiss = () => this.message = null
    @action readonly set = (message: string) => this.message = message
}
