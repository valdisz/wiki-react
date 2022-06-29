import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './app'

it('app can render', () => {
    render(<App />)
    const button = screen.getByText(/discover/i)

    expect(button).toBeInTheDocument()
})
