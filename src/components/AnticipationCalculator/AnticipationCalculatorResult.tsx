import React from 'react'
import cx from 'classnames'
import { FiLoader } from 'react-icons/fi'
import { useAnticipationCalculatorValues } from './hooks'
import AnticipationSuccessResult from './AnticipationSuccessResult'
import AnticipationErrorResult from './AnticipationErrorResult'
import { useDelay } from '@/lib/hooks/utils'

interface Props {
  className?: string
}

const AnticipationCalculatorResult: React.FC<Props> = ({ className }) => {
  const query = useAnticipationCalculatorValues()
  const dateToValue = query.data || initialDateToValue
  const showLoadingIndicator =
    useDelay(query.isLoading ? 1000 : -1) && query.isLoading

  return (
    <div
      className={cx(
        'wrapper rounded-br rounded-tr p-8 sm:py-20 relative',
        query.error && 'bg-red-100',
        !query.error && 'bg-gray-100',
        className,
      )}
    >
      {!query.error && (
        <AnticipationSuccessResult
          isLoading={query.isLoading}
          dateToValue={dateToValue}
        />
      )}
      {query.error && <AnticipationErrorResult error={query.error} />}

      {showLoadingIndicator && (
        <FiLoader className="animate-spin absolute top-8 inset-x-0 text-2xl mx-auto text-blue-600" />
      )}
      <style jsx>{`
        @media (min-width: 768px) {
          .wrapper {
            max-width: 231px;
            min-width: 231px;
          }
        }
      `}</style>
    </div>
  )
}

const initialDateToValue: Record<string, number> = {
  1: 0,
  15: 0,
  30: 0,
  90: 0,
}

export type AnticipationCalculatorResultProps = Props
export default AnticipationCalculatorResult
