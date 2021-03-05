import React from 'react'

export interface FormContextType {
  change: (
    fieldName: string,
    newValue: any,
    config?: FieldConfig<any>,
  ) => Pick<FieldMeta, 'error'>
  getFieldValue: (fieldName: string) => any
  getState: () => FormState<any>
  listen: (fn: FormListener<any>) => () => void
}

export interface FormState<Values = Record<string, any>> {
  values: Values
  errors: Record<string, any>
  isValid: boolean
}

export interface FormListener<Values> {
  (state: FormState<Values>): void
}

export interface FieldConfig<Value> {
  validate?: (value: Value) => any
}

export interface FieldMeta {
  touched: boolean
  error?: any
}

export const FormContext = React.createContext<FormContextType | null>(null)
