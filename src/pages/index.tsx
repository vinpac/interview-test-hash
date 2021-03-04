import React from 'react'
import cx from 'classnames'
import AnticipationCalculator from '@/components/AnticipationCalculator'
import MetaTags from '@/components/MetaTags'

interface Props {
  className?: string
}

const Index: React.FC<Props> = ({ className }) => {
  return (
    <div className={cx('bg-gray-200', className)}>
      <MetaTags />
      <div className="container mx-auto sm:px-4 min-h-screen sm:flex">
        <AnticipationCalculator className="m-auto" />
      </div>
    </div>
  )
}

export type IndexProps = Props
export default Index
