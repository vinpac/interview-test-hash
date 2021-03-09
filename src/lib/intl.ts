import en from '@/lang/en.json'
import { DEFAULT_LOCALE } from '@/static-constants'
import { useCallback } from 'react'
import {
  defineMessages,
  IntlShape,
  MessageFormatElement,
  useIntl,
} from 'react-intl'
import { ZodError, ZodSchema, ZodSuberror } from 'zod'

export const getSyncMessagesForLocale = (
  locale: SupportedLocales,
): Record<string, string> | Record<string, MessageFormatElement[]> => {
  // Here we can return an empty object for the default locale
  // because in each message definition there's a default message that is fallbacked to
  return locale === 'en' ? en : {}
}

export const castLocale = (locale?: string): SupportedLocales => {
  if (locale === DEFAULT_LOCALE || locale === 'en') {
    return locale
  }

  return DEFAULT_LOCALE
}

const zodMessages = defineMessages({
  invalidNumber: {
    defaultMessage: 'Este não é numero válido',
  },
  tooBig: {
    defaultMessage: 'O número deve ser menor que {maximum}',
  },
  tooSmall: {
    defaultMessage: 'O número deve ser maior que {minimum}',
  },
})

export const intlZodMessage = (intl: IntlShape, error: ZodSuberror): string => {
  if (error.code === 'invalid_type') {
    if (error.expected === 'number') {
      return intl.formatMessage(zodMessages.invalidNumber)
    }
  }

  if (error.code === 'too_big') {
    return intl.formatMessage(zodMessages.tooBig, { maximum: error.maximum })
  }

  if (error.code === 'too_small') {
    return intl.formatMessage(zodMessages.tooSmall, { minimum: error.minimum })
  }

  return error.message
}

export interface UseIntlZodValidationResult<Values> {
  (values: Values): Record<string, string>
}
export const useIntlZodValidation = <Values, TransformedValues>(
  schema: ZodSchema<any, any>,
  transformValues?: (values: Values) => TransformedValues,
): UseIntlZodValidationResult<Values> => {
  const intl = useIntl()
  return useCallback(
    (values: Values): Record<string, string> => {
      try {
        const normalizedValues = transformValues
          ? transformValues(values)
          : values
        schema.parse(normalizedValues)

        return {}
      } catch (error) {
        const zodError: ZodError = error

        return zodError.errors.reduce((errors, fieldError) => {
          const fieldPath = fieldError.path.join('.')
          errors[fieldPath] = intlZodMessage(intl, fieldError)
          return errors
        }, {} as Record<string, string>)
      }
    },
    [intl, schema, transformValues],
  )
}
