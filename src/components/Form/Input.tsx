import React, { useContext } from 'react'
import { InputGroupContext } from './InputGroup'
import InputPrimitive, { InputPrimitiveProps } from './InputPrimitive'

const Input: React.FC<InputPrimitiveProps> = (props) => {
  const ctx = useContext(InputGroupContext)
  let style = props.style
  if (ctx?.leftAddon || ctx?.rightAddon) {
    if (!style) style = {}
    if (ctx.leftAddon) style.paddingLeft = ctx.leftAddon.size
    if (ctx.rightAddon) style.paddingRight = ctx.rightAddon.size
  }

  return <InputPrimitive {...props} style={style} />
}

export type InputProps = InputPrimitiveProps
export default Input
