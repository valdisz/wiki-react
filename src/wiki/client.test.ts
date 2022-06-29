import { WikiClient } from './client'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } })
  })
) as any


describe('WikiClient', () => {
    it('ff', () => {
        expect(true).toBe(true)
    })
})
