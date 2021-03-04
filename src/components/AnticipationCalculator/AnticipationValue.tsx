import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import cx from 'classnames'

interface Props {
  days: number
  value: number
  className?: string
}

const AnticipationValue: React.FC<Props> = ({ className, days, value }) => {
  const intl = useIntl()
  const valueAsCurrency = intl.formatNumber(value, {
    style: 'currency',
    currency: 'BRL',
  })
  return (
    <div className={cx('italic text-blue-400', className)}>
      {days === 1 ? (
        <FormattedMessage
          defaultMessage="Amanhã: {value}"
          values={{
            days,
            value: <strong>{valueAsCurrency}</strong>,
          }}
        />
      ) : (
        <FormattedMessage
          defaultMessage="Em {days} dias: {value}"
          values={{
            days,
            value: <strong>{valueAsCurrency}</strong>,
          }}
        />
      )}
    </div>
  )
}

export type AnticipationValueProps = Props
export default AnticipationValue
