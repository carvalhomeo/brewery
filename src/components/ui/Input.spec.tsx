import Input from './Input'
import { render, screen } from '@testing-library/react'

describe('Input Component', () => {
  it('should render input with label', () => {
    render(<Input type="text" label="Name" name="name" />)
    const input = screen.getByRole('textbox', { name: /name/i })

    expect(input).toBeInTheDocument()
  })
})
