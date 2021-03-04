import React, { useContext, useEffect } from 'react'
import cx from 'classnames'
import { InputAddon as InputAddonType, InputGroupContext } from './InputGroup'

interface Props {
  position: InputAddonType['position']
  size?: InputAddonType['size']
  className?: string
}

const InputAddon: React.FC<Props> = ({
  className,
  size = '2rem',
  position,
  children,
}) => {
  const ctx = useContext(InputGroupContext)
  const registerAddon = ctx?.registerAddon

  useEffect(() => {
    if (!registerAddon) {
      console.warn('InputAddon can only be used insise InputGroup')
      return
    }
    // It will automatically unregister on unmount
    return registerAddon({ position, size })
  }, [position, size, registerAddon])

  if (!registerAddon) {
    return null
  }

  return (
    <div
      className={cx(
        'absolute inset-y-0',
        // Size
        'text-sm leading-9 px-3',
        // Position
        position === 'left' ? 'left-0' : 'right-0',
        className,
      )}
      style={{ zIndex: 2 }}
    >
      {children}
    </div>
  )
}

export type InputAddonProps = Props
export default InputAddon
