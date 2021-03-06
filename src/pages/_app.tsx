import '../styles.css'

import React, { useMemo } from 'react'
import { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { DEFAULT_LOCALE } from '@/static-constants'
import { useRouter } from 'next/dist/client/router'
import { castLocale, getSyncMessagesForLocale } from '@/lib/intl'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const locale = castLocale(router.locale)
  const messages = getSyncMessagesForLocale(locale)

  const client = useMemo(() => new QueryClient(), [])

  return (
    <IntlProvider
      messages={messages}
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </IntlProvider>
  )
}

export default App
