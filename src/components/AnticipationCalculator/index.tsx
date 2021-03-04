import React from 'react'
import cx from 'classnames'
import AnticipationCalculatorForm from './AnticipationCalculatorForm'
import AnticipationCalculatorResult from './AnticipationCalculatorResult'
import { Form } from 'react-final-form'

interface Props {
  className?: string
}

const AnticipationCalculator: React.FC<Props> = ({ className }) => {
  const handleSubmit = (): void => {
    // ...
  }

  return (
    <div
      className={cx(
        'calculator w-full bg-white rounded sm:flex sm:border border-gray-400 sm:border-t-2',
        className,
      )}
    >
      <Form
        className={cx('', className)}
        onSubmit={handleSubmit}
        subscription={{ submitting: true, pristine: true }}
        initialValues={initialValues}
      >
        {({ handleSubmit }) => (
          <>
            <AnticipationCalculatorForm
              onSubmit={handleSubmit}
              className="flex-grow"
            />
            <AnticipationCalculatorResult />
          </>
        )}
      </Form>
      <style jsx>{`
        @media (min-width: 640px) {
          .calculator {
            max-width: 608px;
          }
        }
      `}</style>
    </div>
  )
}

const initialValues: FormValues = {
  amount: '',
  installments: '',
  mdr: '',
}

export interface FormValues {
  amount: string
  installments: string
  mdr: string
}

export type AnticipationCalculatorProps = Props
export default AnticipationCalculator
