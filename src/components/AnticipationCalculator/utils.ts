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

export const isNumber = (value: string): string | undefined => {
  if (!value || !/^[0-9]+$/.test(value)) {
    return 'Este não é um número válido'
  }
}

export const installmentsValidation = (value: string): string | undefined => {
  // It looks confusing this way.
  // In other versions it should be more intuitive
  if (!isNumber(value)) {
    // If it pass the value IS a number
    const int = parseInt(value, 10)
    return int < 1 || int > 12
      ? 'Você pode parcelar somente entre 1 a 12 vezes'
      : undefined
  }
}
