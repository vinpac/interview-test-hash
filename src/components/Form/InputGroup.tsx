import React, { useCallback, useMemo, useState } from 'react'
import cx from 'classnames'

interface Props {
  className?: string
}

const InputGroup: React.FC<Props> = ({ className, children }) => {
  const [leftAddon, setLeftAddon] = useState<InputAddon | undefined>()
  const [rightAddon, setRightAddon] = useState<InputAddon | undefined>()
  const registerAddon = useCallback((addon: InputAddon) => {
    const setAddon = addon.position === 'left' ? setLeftAddon : setRightAddon
    setAddon(addon)
    return () => setAddon(undefined)
  }, [])
  const ctx = useMemo<InputGroupContextValue>(
    () => ({
      leftAddon,
      rightAddon,
      registerAddon,
    }),
    [leftAddon, rightAddon, registerAddon],
  )
  return (
    <div className={cx('relative', className)}>
      <InputGroupContext.Provider value={ctx}>
        {children}
      </InputGroupContext.Provider>
    </div>
  )
}

export type InputGroupProps = Props

export interface InputAddon {
  size: string
  position: 'left' | 'right'
}

type UnregisterAddon = () => void
type RegisterAddon = (addon: InputAddon) => UnregisterAddon
export interface InputGroupContextValue {
  leftAddon?: InputAddon
  rightAddon?: InputAddon
  registerAddon: RegisterAddon
}
export const InputGroupContext = React.createContext<InputGroupContextValue | null>(
  null,
)

export default InputGroup
