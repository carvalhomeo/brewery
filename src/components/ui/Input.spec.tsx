import Input from './Input'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Input Component', () => {
  it('should render input with label', () => {
    render(<Input type="text" label="Name" name="name" />)
    const input = screen.getByRole('textbox', { name: /name/i })

    expect(input).toBeInTheDocument()
  })

  it('should be able to type', async () => {
    const user = userEvent.setup()
    render(<Input type="text" label="Name" name="name" />)
    const input = screen.getByRole('textbox', { name: /name/i })

    expect(input).toBeInTheDocument()
    await user.type(input, 'This is my name')
    expect(input).toHaveValue('This is my name')
    screen.logTestingPlaygroundURL()
  })
})
