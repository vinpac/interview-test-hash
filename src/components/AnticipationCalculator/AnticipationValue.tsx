import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import cx from 'classnames'

interface Props {
  days: number | string
  value: number
  isLoading?: boolean
  className?: string
}

const AnticipationValue: React.FC<Props> = ({
  className,
  days,
  value,
  isLoading,
}) => {
  const intl = useIntl()
  const valueAsCurrency = intl.formatNumber(value, {
    style: 'currency',
    currency: 'BRL',
  })
  const renderedValue = isLoading ? (
    <span className="h-4 bg-blue-400 w-12 inline-block align-middle opacity-25" />
  ) : (
    <strong>{valueAsCurrency}</strong>
  )
  return (
    <div className={cx('italic text-blue-400', className)}>
      {days === 1 ? (
        <FormattedMessage
          defaultMessage="Amanhã: {value}"
          values={{
            days,
            value: renderedValue,
          }}
        />
      ) : (
        <FormattedMessage
          defaultMessage="Em {days} dias: {value}"
          values={{
            days,
            value: renderedValue,
          }}
        />
      )}
    </div>
  )
}

export type AnticipationValueProps = Props
export default AnticipationValue
