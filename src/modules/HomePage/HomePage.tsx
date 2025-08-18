'use client'
import { Checkbox } from '@/components/common/checkbox'
import { Trans } from '@lingui/react/macro'
import { FC } from 'react'

interface Props {}

const HomePage: FC<Props> = () => {
  return (
    <div className="w-full">
      <section className="w-full pb-6 pl-4 lg:pl-8">
        <Checkbox />
      </section>
      <Trans>Home</Trans>
      <section className="pt-8 pr-4 pl-4 lg:pl-8 xl:pr-18"></section>
    </div>
  )
}

export default HomePage
