import React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'

const MetaTags: React.FC<NextSeoProps> = ({
  title = 'Interview Test | @vinpac',
  description = 'This is the interview test response made by Vinicius Pacheco (github.com/vinpac)',
  twitter = {
    handle: 'vinpac',
  },
  ...props
}) => {
  return (
    <NextSeo
      title={title}
      description={description}
      twitter={twitter}
      {...props}
    />
  )
}

export type MetaTagsProps = NextSeoProps
export default MetaTags
