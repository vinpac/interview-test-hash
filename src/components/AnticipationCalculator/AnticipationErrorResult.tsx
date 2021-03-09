import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { MdError } from 'react-icons/md'
import { QueryError } from '@/lib/query/errors'

interface Props {
  error: QueryError
}

const AnticipationErrorResult: React.FC<Props> = ({ error }) => {
  const intl = useIntl()
  const isOffline = !(error instanceof QueryError)

  const title = intl.formatMessage(
    isOffline
      ? messages.offlineTitle
      : error.statusCode === 408
      ? messages.timeoutTitle
      : error.statusCode === 400
      ? messages.badRequestErrorTitle
      : messages.internalErrorTitle,
  )
  const description = intl.formatMessage(
    isOffline
      ? messages.offlineDescription
      : error.statusCode === 408
      ? messages.timeoutDescription
      : error.statusCode === 400
      ? messages.badRequestErrorDescription
      : messages.internalErrorDescription,
  )
  return (
    <>
      <div className="w-16 h-16 bg-red-200 text-red-800 rounded-full mx-auto text-4xl text-center leading-relaxed mb-4 animate-bounce">
        <MdError className="align-middle inline-block" />
      </div>
      <h3 className="text-md text-center font-bold text-red-800">{title}</h3>
      <p className="text-sm text-gray-800 text-center">{description}</p>
    </>
  )
}

const messages = defineMessages({
  offlineTitle: {
    defaultMessage: 'Offline',
  },
  offlineDescription: {
    defaultMessage:
      'Você está offline no momento. Conecte à internet para fazer a simulação',
  },
  timeoutTitle: {
    defaultMessage: 'Timeout',
  },
  timeoutDescription: {
    defaultMessage:
      'Nosso servidor demorou muito para responder. Por favor, tente novamente.',
  },
  internalErrorTitle: {
    defaultMessage: 'Erro interno',
  },
  internalErrorDescription: {
    defaultMessage:
      'Infelizmente ocorreu um erro que não sabemos. Por favor, tente novamente',
  },

  badRequestErrorTitle: {
    defaultMessage: 'Dados incorretos',
  },
  badRequestErrorDescription: {
    defaultMessage:
      'Não conseguimos enviar os dados corretamente para o nosso servidor. Altere os valores e tente novamente',
  },
})

export type AnticipationErrorResultProps = Props
export default AnticipationErrorResult
