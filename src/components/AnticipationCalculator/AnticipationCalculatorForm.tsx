import React from 'react'
import cx from 'classnames'
import { FormControl, Input, InputAddon, InputGroup } from '../Form'
import { defineMessages, useIntl } from 'react-intl'

interface Props {
  className?: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const AnticipationCalculatorForm: React.FC<Props> = ({
  className,
  onSubmit,
}) => {
  const intl = useIntl()

  return (
    <form onSubmit={onSubmit} className={cx('form px-8 py-10', className)}>
      <h1 className="mb-5 text-2xl font-bold text-gray-700">
        Simule sua Antecipação
      </h1>
      <div className="input-list space-y-5">
        <FormControl
          name="amount"
          label={intl.formatMessage(messages.amountLabel)}
          required
          config={{ validate: isNumber }}
          render={(props) => (
            <InputGroup>
              <InputAddon position="left" size="1.9rem">
                R$
              </InputAddon>
              <Input {...props} />
            </InputGroup>
          )}
          className="form-control"
        />
        <FormControl
          name="installments"
          label={intl.formatMessage(messages.installmentsLabel)}
          hint={intl.formatMessage(messages.installmentsHint)}
          required
          className="form-control"
          config={{
            validate: installmentsValidation,
          }}
        />
        <FormControl
          name="mdr"
          label={intl.formatMessage(messages.mdrLabel)}
          required
          config={{
            validate: isNumber,
          }}
          className="form-control"
        />
      </div>
      <style jsx>{`
        @media (min-width: 640px) {
          .input-list {
            max-width: 251px;
          }

          .form {
            padding-left: 3.5rem;
            padding-right: 2.5rem;
          }
        }
      `}</style>
    </form>
  )
}

const messages = defineMessages({
  amountLabel: { defaultMessage: 'Informe o valor da venda' },
  installmentsLabel: { defaultMessage: 'Em quantas parcelas' },
  installmentsHint: { defaultMessage: 'Máximo de 12 parcelas' },
  mdrLabel: { defaultMessage: 'Informe o percentual de MDR' },
})

const isNumber = (value: string): string | undefined => {
  if (!/^[0-9]+$/.test(value)) {
    return 'Este não é um número válido'
  }
}
const installmentsValidation = (value: string): string | undefined => {
  // It looks confusing this way.
  // In other versions it should be more intuitive
  if (!isNumber(value)) {
    // If it pass the value IS a number
    const int = parseInt(value, 10)
    return int < 1 || int > 12
      ? 'Você pode parcelar somente entre 1 a 12 vezes'
      : undefined
  }
}

export type AnticipationCalculatorFormProps = Props
export default AnticipationCalculatorForm
