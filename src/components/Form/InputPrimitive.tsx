import React from 'react'
import cx from 'classnames'

interface Props extends Omit<React.HTMLProps<HTMLInputElement>, 'as'> {
  as?: string | React.ComponentType
  className?: string
}

const InputPrimitive: React.FC<Props> = ({
  className,
  as: C = 'input',
  ...props
}) => {
  const Input = (C as any) as React.FC<React.HTMLProps<HTMLInputElement>>
  return (
    <Input
      {...props}
      className={cx(
        'w-full border border-gray-300 rounded outline-none appearance-none',
        // Focus
        'focus:border-blue-500',
        // Size
        'h-9 px-3 py-1 text-sm',
        className,
      )}
    />
  )
}

export type InputPrimitiveProps = Props
export default InputPrimitive
