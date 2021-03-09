import { useFormState } from 'react-final-form'
import { FormValues } from '.'
import { API_URL } from '@/static-constants'
import { useQuery, UseQueryResult } from 'react-query'
import { folder, useControls } from 'leva'
import { QueryError } from '@/lib/query/errors'
import { AnticipationCalculatorSchema, normalizeFormValues } from './validation'

export const useAnticipationCalculatorValues = (): UseQueryResult<
  Record<string, number>,
  QueryError
> => {
  const controls = useControls({
    api: folder({
      error: {
        value: '',
        options: ['', 'internalError', 'timeout'],
        hint: 'Controla se a API vai retornar um erro ou não',
      },
      delay: { value: 0, hint: 'Tempo de demora para a resposta em MS' },
    }),
  })
  const formState = useFormState()
  const values = formState.values as FormValues
  let url = `${API_URL}`
  const urlParams: string[] = []

  if (controls.error) {
    urlParams.push(controls.error)
  }
  if (controls.delay) {
    urlParams.push(`delay=${controls.delay}`)
  }

  if (urlParams.length) {
    url += `?${urlParams.join('&')}`
  }

  return useQuery<Record<string, number>, QueryError>(
    [url, values.amount, values.installments, values.mdr],
    async () => {
      const bodyJSON = JSON.stringify(
        AnticipationCalculatorSchema.parse(normalizeFormValues(values)),
      )
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyJSON,
      })
      const json = await res.json()
      if (res.status !== 200) {
        throw new QueryError(json.message, res.status, json)
      }
      return json
    },
    {
      enabled: formState.valid,
      retry: false,
    },
  )
}
