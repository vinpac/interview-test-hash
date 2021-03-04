import '../styles.css'

import React from 'react'
import { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { DEFAULT_LOCALE } from '@/static-constants'
import { useRouter } from 'next/dist/client/router'
import { castLocale, getSyncMessagesForLocale } from '@/lib/intl'
import Head from 'next/head'
import MetaTags from '@/components/MetaTags'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const locale = castLocale(router.locale)
  const messages = getSyncMessagesForLocale(locale)

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
      <Component {...pageProps} />
    </IntlProvider>
  )
}

export default App
