import { DEFAULT_LOCALE } from '@/static-constants'
import { castLocale, getSyncMessagesForLocale } from '../intl'

jest.mock('@/lang/en.json', () => ({
  foo: 'bar',
}))

describe('Intl', () => {
  it('should cast a not supported locale into the default one', () => {
    expect(castLocale('xxx')).toEqual(DEFAULT_LOCALE)
  })

  it('should cast a supported locale into itself', () => {
    expect(castLocale('en')).toEqual('en')
  })

  it('should load the messages correctly for a non-default supported locale', () => {
    expect(getSyncMessagesForLocale('en')).toMatchObject({ foo: 'bar' })
  })

  it('should load the messages correctly for the default locale', () => {
    expect(getSyncMessagesForLocale('pt-BR')).toMatchObject({})
  })
})
