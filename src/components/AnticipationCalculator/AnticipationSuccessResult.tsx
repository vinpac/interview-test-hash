import React from 'react'
import { FormattedMessage } from 'react-intl'
import AnticipationValue from './AnticipationValue'

interface Props {
  dateToValue: Record<string, number>
  isLoading?: boolean
}

const AnticipationSuccessResult: React.FC<Props> = ({
  dateToValue,
  isLoading,
}) => {
  const dates = Object.keys(dateToValue)
  return (
    <>
      <h1 className="text-blue-600 font-bold uppercase italic block pb-1 border-b-2 border-blue-200 mb-6">
        <FormattedMessage defaultMessage="Você receberá:" />
      </h1>
      <div className="space-y-6">
        {dates.map((date) => (
          <AnticipationValue
            key={date}
            isLoading={isLoading}
            days={date}
            value={dateToValue[date]}
          />
        ))}
      </div>
    </>
  )
}

export type AnticipationSuccessResultProps = Props
export default AnticipationSuccessResult
