import { LoadingViewModel } from './loading'

describe('LoadingViewModel', () => {
    let model: LoadingViewModel

    beforeEach(() => {
        model = new LoadingViewModel()
    })

    it('initial loading state must be not loading', () => {
        expect(model.isLoading).toBe(false)
    })

    it('start sets to loading', () => {
        model.start()
        expect(model.isLoading).toBe(true)
    })

    it('stop sets to not loading', () => {
        model.start()
        model.stop()
        expect(model.isLoading).toBe(false)
    })
})
