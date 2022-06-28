import { action, makeObservable, observable } from 'mobx'

export class LoadingViewModel {
    constructor() {
        makeObservable(this)
    }

    @observable isLoading = false

    @action start = () => this.isLoading = true
    @action stop = () => this.isLoading = false
}
