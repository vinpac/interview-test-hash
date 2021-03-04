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
