import { useFormState } from '@/components/Form'
import { FormValues } from '.'
import { normalizeFormValues } from './utils'
import { API_URL } from '@/static-constants'
import { useQuery, UseQueryResult } from 'react-query'
import { folder, useControls } from 'leva'
import { QueryError } from '@/lib/query/errors'

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
  const params = normalizeFormValues(formState.values as FormValues)
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
    ['results', url, params],
    () =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).then((res) =>
        res.json().then((json) => {
          if (res.status !== 200) {
            throw new QueryError(json.message, res.status, json)
          }

          return json
        }),
      ),
    {
      enabled: formState.isValid,
      retry: false,
    },
  )
}
