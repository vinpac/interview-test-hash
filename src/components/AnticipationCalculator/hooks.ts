import { useMemo } from 'react'
import { useFormState } from '@/components/Form'
import { FormValues } from '.'
import { NormalizedFormValues, normalizeFormValues } from './utils'

export const useAnticipationCalculatorValues = (): NormalizedFormValues => {
  const formState = useFormState()
  return useMemo(() => {
    const values = formState.values as FormValues
    return normalizeFormValues(values)
  }, [formState])
}
