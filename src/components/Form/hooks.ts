import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  FieldConfig,
  FieldMeta,
  FormContext,
  FormContextType,
  FormState,
} from './context'

const useFormContext = (): FormContextType => {
  const ctx = useContext(FormContext)

  if (!ctx) throw new Error('FormContext not found on scope')

  return ctx
}

export const useForm = (): FormContextType => {
  const ctx = useFormContext()
  return ctx
}

export interface UseFieldConfig<Value> extends FieldConfig<Value> {
  initialValue?: Value
  initialTouched?: boolean
}

export interface UseFieldResult {
  input: FieldInputProps
  meta: FieldMeta
}

interface FieldInputProps {
  id: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  onBlur: () => void
}

export const useField = <Value = any>(
  fieldName: string,
  config: UseFieldConfig<Value> = {},
): UseFieldResult => {
  const form = useForm()
  const [validationError, setValidationError] = useState(false)
  const [touched, setTouched] = useState(false)
  const defaultValue = useMemo(() => {
    const value = form.getFieldValue(fieldName)
    if (typeof value !== 'undefined') {
      return value
    }

    return config.initialValue
  }, [form, fieldName, config.initialValue])

  useEffect(() => {
    if (fieldName && typeof defaultValue !== 'undefined' && config.validate) {
      form.validateField(fieldName, defaultValue, config.validate)
    }
  }, [form, fieldName, defaultValue, config.validate])

  const onChange: FieldInputProps['onChange'] = useCallback(
    (event) => {
      const nextValue = typeof event === 'string' ? event : event.target.value

      const { error } = form.change(fieldName, nextValue, {
        validate: config.validate,
      })

      setValidationError(error)
    },
    [form, fieldName, setValidationError, config.validate],
  )

  const onBlur: FieldInputProps['onBlur'] = useCallback(() => {
    setTouched(true)
  }, [setTouched])

  const input = useMemo(
    () => ({
      id: fieldName,
      onChange,
      onBlur,
      name: fieldName,
      defaultValue,
    }),
    [onChange, onBlur, fieldName, defaultValue],
  )
  const meta = useMemo<FieldMeta>(
    () => ({
      error: validationError,
      touched,
    }),
    [touched, validationError],
  )

  return useMemo(
    () => ({
      input,
      meta,
    }),
    [input, meta],
  )
}

export const useFormState = <
  Values = Record<string, any>
>(): FormState<Values> => {
  const form = useForm()
  const [state, setState] = useState(() => form.getState())
  useEffect(() => {
    form.listen((nextState) => {
      setState(nextState)
    })
  }, [form, setState])

  return state
}
