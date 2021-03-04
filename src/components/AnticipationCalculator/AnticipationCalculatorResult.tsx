import React from 'react'
import cx from 'classnames'
import { FormattedMessage } from 'react-intl'
import AnticipationValue from './AnticipationValue'

interface Props {
  className?: string
}

const AnticipationCalculatorResult: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cx(
        'wrapper bg-gray-100 rounded-br rounded-tr p-8 sm:py-20',
        className,
      )}
    >
      <h1 className="text-blue-600 font-bold uppercase italic block pb-1 border-b-2 border-blue-200 mb-6">
        <FormattedMessage defaultMessage="Você receberá:" />
      </h1>
      <div className="space-y-6">
        <AnticipationValue days={1} value={0} />
        <AnticipationValue days={15} value={0} />
        <AnticipationValue days={30} value={0} />
        <AnticipationValue days={90} value={0} />
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .wrapper {
            min-width: 231px;
          }
        }
      `}</style>
    </div>
  )
}

export type AnticipationCalculatorResultProps = Props
export default AnticipationCalculatorResult
