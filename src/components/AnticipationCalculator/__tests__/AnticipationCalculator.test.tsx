import { QueryError } from '@/lib/query/errors'
import { render } from '@/__test__/utils'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { enableFetchMocks } from 'jest-fetch-mock'
import AnticipationCalculator from '..'

enableFetchMocks()

describe('AnticipationCalculator', () => {
  beforeEach(() => fetchMock.mockReset())

  describe('API Fetch', () => {
    it('should not fetch API when form values are not valid', () => {
      render(<AnticipationCalculator />)

      const amountInput = screen.getByTestId('input-amount') as HTMLInputElement
      const installmentsInput = screen.getByTestId(
        'input-installments',
      ) as HTMLInputElement
      const mdrInput = screen.getByTestId('input-mdr') as HTMLInputElement

      fireEvent.change(amountInput, { target: { value: '11' } })
      fireEvent.change(installmentsInput, { target: { value: '11' } })
      // { amount: 11, installments: 11, mdr: '' }
      expect(fetchMock).toHaveBeenCalledTimes(0)

      fireEvent.change(installmentsInput, { target: { value: '' } })
      fireEvent.change(mdrInput, { target: { value: '10' } })
      // { amount: 11, installments: '', mdr: '10' }
      expect(fetchMock).toHaveBeenCalledTimes(0)

      fireEvent.change(amountInput, { target: { value: '' } })
      fireEvent.change(installmentsInput, { target: { value: '10' } })
      // { amount: '', installments: '10', mdr: '10' }
      expect(fetchMock).toHaveBeenCalledTimes(0)

      fireEvent.change(amountInput, { target: { value: '-10' } })
      // { amount: '-10', installments: '10', mdr: '10' }
      expect(fetchMock).toHaveBeenCalledTimes(0)

      fireEvent.change(mdrInput, { target: { value: '-10' } })
      fireEvent.change(amountInput, { target: { value: '10' } })
      // { amount: '10', installments: '10', mdr: '-10' }
      expect(fetchMock).toHaveBeenCalledTimes(0)

      fireEvent.change(amountInput, { target: { value: '-10' } })
      fireEvent.change(mdrInput, { target: { value: '10' } })
      // { amount: '-10', installments: '10', mdr: '10' }
      expect(fetchMock).toHaveBeenCalledTimes(0)

      fireEvent.change(installmentsInput, { target: { value: '13' } })
      fireEvent.change(amountInput, { target: { value: '10' } })
      // { amount: '10', installments: '13', mdr: '10' }
      expect(fetchMock).toHaveBeenCalledTimes(0)

      fireEvent.change(installmentsInput, { target: { value: '-1' } })
      // { amount: '10', installments: '-1', mdr: '10' }
      expect(fetchMock).toHaveBeenCalledTimes(0)
    })

    it('should fetch API when form values are valid', () => {
      render(<AnticipationCalculator />)
      fetchMock.mockResponseOnce(JSON.stringify({ 1: 0 }))

      const amountInput = screen.getByTestId('input-amount') as HTMLInputElement
      const installmentsInput = screen.getByTestId(
        'input-installments',
      ) as HTMLInputElement
      const mdrInput = screen.getByTestId('input-mdr') as HTMLInputElement

      fireEvent.change(amountInput, { target: { value: '11' } })
      fireEvent.change(installmentsInput, { target: { value: '11' } })
      fireEvent.change(mdrInput, { target: { value: '11' } })
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('Form Errors', () => {
    it('input: amount', () => {
      render(<AnticipationCalculator />)

      const amountInput = screen.getByTestId('input-amount') as HTMLInputElement

      fireEvent.change(amountInput, { target: { value: '1' } })
      fireEvent.blur(amountInput)
      expect(screen.queryByRole('error')).toBeNull()

      // should be a valid number
      fireEvent.change(amountInput, { target: { value: 'a' } })
      expect(screen.queryByRole('error')).not.toBeNull()

      // should be more than 1
      fireEvent.change(amountInput, { target: { value: '-1' } })
      expect(screen.queryByRole('error')).not.toBeNull()

      // should be less than 1 million
      fireEvent.change(amountInput, { target: { value: '1000001' } })
      expect(screen.queryByRole('error')).not.toBeNull()

      // should be valid again
      fireEvent.change(amountInput, { target: { value: '1' } })
      expect(screen.queryByRole('error')).toBeNull()
    })

    it('input: installments', () => {
      render(<AnticipationCalculator />)

      const installmentsInput = screen.getByTestId(
        'input-installments',
      ) as HTMLInputElement

      fireEvent.change(installmentsInput, { target: { value: '1' } })
      fireEvent.blur(installmentsInput)
      expect(screen.queryByRole('error')).toBeNull()

      // should be a valid number
      fireEvent.change(installmentsInput, { target: { value: 'a' } })
      expect(screen.queryByRole('error')).not.toBeNull()

      // should be more than 1
      fireEvent.change(installmentsInput, { target: { value: '-1' } })
      expect(screen.queryByRole('error')).not.toBeNull()

      // should be less than 12
      fireEvent.change(installmentsInput, { target: { value: '13' } })
      expect(screen.queryByRole('error')).not.toBeNull()

      // should be valid again
      fireEvent.change(installmentsInput, { target: { value: '1' } })
      expect(screen.queryByRole('error')).toBeNull()
    })

    it('input: mdr', () => {
      render(<AnticipationCalculator />)

      const mdrInput = screen.getByTestId('input-mdr') as HTMLInputElement

      fireEvent.change(mdrInput, { target: { value: '1' } })
      fireEvent.blur(mdrInput)
      expect(screen.queryByRole('error')).toBeNull()

      // should be a valid number
      fireEvent.change(mdrInput, { target: { value: 'a' } })
      expect(screen.queryByRole('error')).not.toBeNull()

      // should be more than 1
      fireEvent.change(mdrInput, { target: { value: '-1' } })
      expect(screen.queryByRole('error')).not.toBeNull()

      // should be valid again
      fireEvent.change(mdrInput, { target: { value: '1' } })
      expect(screen.queryByRole('error')).toBeNull()
    })
  })

  describe('Result', () => {
    const originalConsoleError = console.error
    beforeAll(() => {
      console.error = jest.fn()
    })
    afterAll(() => {
      console.error = originalConsoleError
    })

    it('should show initial values', () => {
      render(<AnticipationCalculator />)

      const elements = screen.getAllByTestId(/^anticipation-value-/)

      expect(elements).toHaveLength(4)
      elements.forEach((el) => {
        expect(el.getAttribute('data-value')).toBe('0')
      })
    })

    it('should show right values from api response', async () => {
      render(<AnticipationCalculator />)

      const response: Record<string, number> = {
        1: 111,
        15: 555,
        30: 333,
        90: 999,
      }
      fetchMock.mockResponseOnce(JSON.stringify(response))

      fireEvent.change(screen.getByTestId('input-amount'), {
        target: { value: '12' },
      })
      fireEvent.change(screen.getByTestId('input-installments'), {
        target: { value: '5' },
      })
      fireEvent.change(screen.getByTestId('input-mdr'), {
        target: { value: '12' },
      })

      await waitFor(
        () =>
          screen
            .getAllByTestId(/^anticipation-value-/)[0]
            .getAttribute('data-value') !== '0',
      )

      const elements = screen.getAllByTestId(/^anticipation-value-/)

      const requestDays = Object.keys(response)
      expect(elements).toHaveLength(requestDays.length)

      // 1, 15, 30, 90
      requestDays.forEach((days) => {
        const el = elements.find(
          (el) => el.getAttribute('data-days') === String(days),
        )

        if (!el) {
          throw new Error(`Didn't found element for days ${days}`)
        }

        expect(el.getAttribute('data-value')).toBe(String(response[days]))
      })
    })

    it('should handle internalError', async () => {
      render(<AnticipationCalculator />)

      fetchMock.mockRejectOnce(() =>
        Promise.reject(new QueryError('Internal Error', 500)),
      )

      fireEvent.change(screen.getByTestId('input-amount'), {
        target: { value: '12' },
      })
      fireEvent.change(screen.getByTestId('input-installments'), {
        target: { value: '5' },
      })
      fireEvent.change(screen.getByTestId('input-mdr'), {
        target: { value: '12' },
      })

      const expectedMessage = 'Erro interno'
      expect(screen.queryByText(expectedMessage)).toBeNull()
      await waitFor(() => {
        return screen.queryByText(expectedMessage)
      })
      expect(screen.queryByText(expectedMessage)).not.toBeNull()
    })

    it('should handle badRequest', async () => {
      render(<AnticipationCalculator />)

      fetchMock.mockRejectOnce(new QueryError('Bad Request', 400))

      fireEvent.change(screen.getByTestId('input-amount'), {
        target: { value: '12' },
      })
      fireEvent.change(screen.getByTestId('input-installments'), {
        target: { value: '5' },
      })
      fireEvent.change(screen.getByTestId('input-mdr'), {
        target: { value: '12' },
      })

      const expectedMessage = 'Dados incorretos'
      expect(screen.queryByText(expectedMessage)).toBeNull()
      await waitFor(() => {
        return screen.queryByText(expectedMessage)
      })
      expect(screen.queryByText(expectedMessage)).not.toBeNull()
    })

    it('should handle timeout', async () => {
      render(<AnticipationCalculator />)

      fetchMock.mockRejectOnce(new QueryError('Timeout', 408))

      fireEvent.change(screen.getByTestId('input-amount'), {
        target: { value: '12' },
      })
      fireEvent.change(screen.getByTestId('input-installments'), {
        target: { value: '5' },
      })
      fireEvent.change(screen.getByTestId('input-mdr'), {
        target: { value: '12' },
      })

      const expectedMessage = 'Timeout'
      expect(screen.queryByText(expectedMessage)).toBeNull()
      await waitFor(() => {
        return screen.queryByText(expectedMessage)
      })
      expect(screen.queryByText(expectedMessage)).not.toBeNull()
    })

    it('should handle offline user', async () => {
      render(<AnticipationCalculator />)

      fetchMock.mockRejectOnce(new Error('offline'))

      fireEvent.change(screen.getByTestId('input-amount'), {
        target: { value: '12' },
      })
      fireEvent.change(screen.getByTestId('input-installments'), {
        target: { value: '5' },
      })
      fireEvent.change(screen.getByTestId('input-mdr'), {
        target: { value: '12' },
      })

      const expectedMessage = 'Offline'
      expect(screen.queryByText(expectedMessage)).toBeNull()
      await waitFor(() => {
        return screen.queryByText(expectedMessage)
      })
      expect(screen.queryByText(expectedMessage)).not.toBeNull()
    })
  })
})
