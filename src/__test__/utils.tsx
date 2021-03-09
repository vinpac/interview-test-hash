import {
  Queries,
  render as baseRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'
import { queries } from '@testing-library/dom'
import React, { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { DEFAULT_LOCALE } from '@/static-constants'
import { QueryClient, QueryClientProvider } from 'react-query'

const Wrapper: React.FC = ({ children }) => {
  const client = useMemo(() => new QueryClient(), [])
  return (
    <IntlProvider
      messages={{}}
      locale={DEFAULT_LOCALE}
      defaultLocale={DEFAULT_LOCALE}
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </IntlProvider>
  )
}

export function render<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement
>(
  ui: React.ReactElement,
  options?: RenderOptions<Q, Container>,
): RenderResult<Q, Container> {
  return baseRender(ui, {
    ...options,
    wrapper: Wrapper,
  })
}
