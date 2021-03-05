import React, { useCallback, useMemo, useRef } from 'react'
import {
  FieldConfig,
  FieldMeta,
  FormContext,
  FormContextType,
  FormListener,
} from './context'

interface Props {
  initialValues?: Record<string, any>
  children: (props: ChildrenProps) => JSX.Element
}

interface ChildrenProps {
  handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void
}

const Form: React.FC<Props> = ({ children, initialValues }) => {
  const errorsRef = useRef<Record<string, any>>({})
  const valuesRef = useRef(initialValues || {})
  const handleSubmit = useCallback((event?: React.FormEvent) => {
    event?.preventDefault()
  }, [])
  const childrenProps = useMemo<ChildrenProps>(() => ({ handleSubmit }), [
    handleSubmit,
  ])
  const listeners = useRef<FormListener<any>[]>([])
  const listen = useCallback((listener: FormListener<any>) => {
    listeners.current.push(listener)
    return () => listeners.current.filter((item) => item !== listener)
  }, [])
  const getState = useCallback(() => {
    return {
      values: valuesRef.current,
      errors: errorsRef.current,
      isValid: Object.keys(errorsRef.current).length === 0,
    }
  }, [])
  const dispatchStateChange = useCallback(() => {
    listeners.current.forEach((fn) => {
      fn(getState())
    })
  }, [getState])
  const change = useCallback(
    (
      fieldName: string,
      value: any,
      config?: FieldConfig<any>,
    ): Pick<FieldMeta, 'error'> => {
      valuesRef.current = {
        ...valuesRef.current,

        [fieldName]: value,
      }

      let fieldError: any
      try {
        fieldError = config?.validate?.(value)
      } catch (error) {
        fieldError = error
      }

      if (fieldError) {
        errorsRef.current[fieldName] = fieldError
      } else {
        delete errorsRef.current[fieldName]
      }

      dispatchStateChange()

      return { error: fieldError }
    },
    [dispatchStateChange],
  )
  const getFieldValue = useCallback(
    (fieldName: string) => {
      const { values } = getState()
      return values[fieldName]
    },
    [getState],
  )
  const ctxValue = useMemo<FormContextType>(
    () => ({
      listen,
      change,
      getFieldValue,
      getState,
    }),
    [listen, change, getFieldValue, getState],
  )
  return (
    <FormContext.Provider value={ctxValue}>
      {children(childrenProps)}
    </FormContext.Provider>
  )
}

export type FormProps = Props
export default Form
