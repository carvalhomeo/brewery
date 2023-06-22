import Button from './Button'
import { render, screen } from '@testing-library/react'

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click</Button>)
    const btn = screen.getByRole('button', { name: /click/i })

    expect(btn).toBeInTheDocument()
  })
})
