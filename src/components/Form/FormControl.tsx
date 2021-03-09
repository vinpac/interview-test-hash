import React, { useCallback } from 'react'
import cx from 'classnames'
import { useField, UseFieldConfig } from 'react-final-form'
import Input, { InputProps } from './Input'

interface Props extends InputProps {
  name: string
  label?: string
  hint?: string
  config?: UseFieldConfig<any>
  className?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  render?: (props: any) => JSX.Element
}

const FormControl: React.FC<Props> = ({
  name,
  label,
  hint,
  config,
  className,
  render,
  onChange,
  required,
  ...props
}) => {
  const { input, meta } = useField(name, config)
  const inputOnChange = input.onChange
  const error = meta.touched ? meta.error : undefined

  const handleChange = useCallback(
    (event) => {
      inputOnChange(event)

      if (onChange) {
        onChange(event)
      }
    },
    [onChange, inputOnChange],
  )
  const rendered = render ? (
    render({ ...props, ...input, onChange: handleChange })
  ) : (
    <Input {...props} {...input} onChange={handleChange} />
  )

  return (
    <div className={cx('', className)}>
      {label && (
        <label
          htmlFor={input.id}
          className="block mb-1.5 text-sm text-gray-700"
        >
          {label}
          {required && ' *'}
        </label>
      )}
      {rendered}
      {(hint || error) && (
        <span
          role={error ? 'error' : 'hint'}
          className={cx(
            'text-xs font-bold',
            error ? 'text-red-500' : 'text-gray-500',
          )}
        >
          {error || hint}
        </span>
      )}
    </div>
  )
}

export type FormControlProps = Props
export default FormControl
