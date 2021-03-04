import en from '@/lang/en.json'
import { DEFAULT_LOCALE } from '@/static-constants'
import { MessageFormatElement } from 'react-intl'

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
