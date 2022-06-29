import { ErrorViewModel } from './error'

describe('ErrorViewModel', () => {
    let model: ErrorViewModel

    beforeEach(() => {
        model = new ErrorViewModel()
    })

    it('initially error not visible', () => {
        expect(model.visible).toBe(false)
    })

    it('initially error message not set', () => {
        expect(model.message).toBe(null)
    })

    it('error message can be set', () => {
        model.set('error 2')
        expect(model.message).toBe('error 2')
    })

    it('error is visible when non-empty error text present', () => {
        model.set('error')
        expect(model.visible).toBe(true)
    })

    it('dismiss clears error message', () => {
        model.set('error')
        model.dismiss()
        expect(model.message).toBe(null)
    })

    it('dismiss makes error not visible', () => {
        model.set('error')
        model.dismiss()
        expect(model.visible).toBe(false)
    })
})
