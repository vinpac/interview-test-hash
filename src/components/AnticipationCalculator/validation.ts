import * as z from 'zod'
import { FormValues } from '.'

export interface NormalizedFormValues {
  amount: number
  installments: number
  mdr: number
}

export const normalizeFormValues = (
  formValues: FormValues,
): NormalizedFormValues => {
  return {
    amount: parseInt(formValues.amount, 10),
    installments: parseInt(formValues.installments, 10),
    mdr: parseInt(formValues.mdr, 10),
  }
}
export const AnticipationCalculatorSchema = z.object({
  installments: z.number().min(1).max(12),
  amount: z.number().positive().max(1000000),
  mdr: z.number().positive(),
})
