import { render, fireEvent, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
// import '@testing-library/jest-dom/extend-expect'
import { Form, FormControl } from '@/components/Form'
import { useFormState } from '../hooks'

describe('Form', () => {
  it('should change form values when an input changes', () => {
    render(
      <Form>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <FormControl label="Foo" name="foo" />
          </form>
        )}
      </Form>,
    )

    const input = screen.getByLabelText('Foo') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Bar' } })
    expect(input.value).toBe('Bar')
  })

  it('should change correctly handle initial values', () => {
    render(
      <Form initialValues={{ foo: 'Bar' }}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <FormControl label="Foo" name="foo" />
          </form>
        )}
      </Form>,
    )

    const input = screen.getByLabelText('Foo') as HTMLInputElement
    expect(input.value).toBe('Bar')
  })

  it('should listen to form state', () => {
    const ListenComponent: React.FC = () => {
      const state = useFormState()
      // Ensure JSON key order
      return (
        <div role="state">
          {JSON.stringify({
            values: state.values,
            errors: state.errors,
            isValid: state.isValid,
          })}
        </div>
      )
    }

    render(
      <Form initialValues={{ foo: 'Foo', hash: 'Hash' }}>
        {(props) => (
          <form onSubmit={props.handleSubmit} role="form">
            <FormControl label="Foo" name="foo" />
            <FormControl label="Hash" name="hash" />
            <ListenComponent />
          </form>
        )}
      </Form>,
    )

    const inputFoo = screen.getByLabelText('Foo') as HTMLInputElement
    const inputHash = screen.getByLabelText('Hash') as HTMLInputElement

    expect(inputFoo.value).toBe('Foo')
    expect(inputHash.value).toBe('Hash')

    fireEvent.change(inputFoo, { target: { value: 'Changed to Hash' } })
    fireEvent.change(inputHash, { target: { value: 'Changed to Foo' } })

    const div = screen.getByRole('state')

    expect(div.innerHTML).toBe(
      JSON.stringify({
        values: { foo: 'Changed to Hash', hash: 'Changed to Foo' },
        errors: {},
        isValid: true,
      }),
    )

    fireEvent.change(inputFoo, { target: { value: 'Changed 2' } })

    expect(div.innerHTML).toBe(
      JSON.stringify({
        values: { foo: 'Changed 2', hash: 'Changed to Foo' },
        errors: {},
        isValid: true,
      }),
    )
  })

  it('should validate fields', () => {
    const ListenComponent: React.FC = () => {
      const state = useFormState()
      // Ensure JSON key order
      return (
        <div role="state">
          {JSON.stringify({ errors: state.errors, isValid: state.isValid })}
        </div>
      )
    }

    const required = (value: string): string | boolean => !value && 'Required'
    render(
      <Form initialValues={{ foo: 'Foo' }}>
        {(props) => (
          <form onSubmit={props.handleSubmit} role="form">
            <FormControl
              label="Foo"
              name="foo"
              config={{ validate: required }}
            />
            <ListenComponent />
          </form>
        )}
      </Form>,
    )

    const inputFoo = screen.getByLabelText('Foo') as HTMLInputElement
    fireEvent.change(inputFoo, { target: { value: '' } })
    const div = screen.getByRole('state')

    expect(div.innerHTML).toBe(
      JSON.stringify({
        errors: { foo: 'Required' },
        isValid: false,
      }),
    )

    fireEvent.change(inputFoo, { target: { value: 'A' } })

    expect(div.innerHTML).toBe(
      JSON.stringify({
        errors: {},
        isValid: true,
      }),
    )
  })

  it('should error on FormControl', () => {
    const required = (value: string): string | boolean => !value && 'Required'
    render(
      <Form initialValues={{ foo: 'Foo' }}>
        {(props) => (
          <form onSubmit={props.handleSubmit} role="form">
            <FormControl
              label="Foo"
              name="foo"
              config={{ validate: required }}
            />
          </form>
        )}
      </Form>,
    )

    const inputFoo = screen.getByLabelText('Foo') as HTMLInputElement
    fireEvent.change(inputFoo, { target: { value: '' } })

    expect(screen.queryByText('Required')).toBeNull()
    fireEvent.blur(inputFoo)

    expect(screen.getByText('Required')).not.toBeNull()
  })
})
