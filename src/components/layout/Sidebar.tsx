'use client'
import React, { FC, JSX } from 'react'
import { VStack } from '../common/v-stack'
import { Logo } from '../ui/Logo'
import { MenuItem } from './MenuItem'
import { DepositIcon, FillEggCrackIcon, SwapIcon, WithdrawIcon } from '@/assets'
import useTranslations from '@/hooks/useTranslations'
import { CommonTranslationKey } from '@/types/translation'
import { usePathname } from '@/i18n/navigation'
import Link from 'next/link'
import { ActiveSession } from '../ui/ActiveSession'
import { HStack } from '../common/h-stack'

interface Props {}

interface SidebarItemProps {
  icon?: JSX.Element
  label: CommonTranslationKey
  href: string
}

const SIDEBAR: SidebarItemProps[] = [
  {
    icon: <FillEggCrackIcon />,
    label: 'sidebar.ybt',
    href: '/',
  },
  {
    icon: <DepositIcon />,
    label: 'sidebar.deposit',
    href: '/deposit',
  },
  {
    icon: <WithdrawIcon />,
    label: 'sidebar.withdraw',
    href: '/withdraw',
  },
  {
    icon: <SwapIcon />,
    label: 'sidebar.swap',
    href: '/swap',
  },
  {
    icon: <SwapIcon />,
    label: 'sidebar.system-design',
    href: '/system-design',
  },
]

const TERMS: SidebarItemProps[] = [
  {
    label: 'sidebar.developers',
    href: '/developers',
  },
  {
    label: 'sidebar.privacy',
    href: '/privacy',
  },
  {
    label: 'sidebar.terms',
    href: '/terms',
  },
]

export const Sidebar: FC<Props> = () => {
  const { t } = useTranslations('common')
  const pathname = usePathname()

  return (
    <VStack className="border-secondary fixed hidden h-screen w-65 border-r p-4 lg:flex" justify="between">
      <VStack spacing={24}>
        <Logo />
        <VStack spacing={4}>
          {SIDEBAR.map((item) => (
            <Link href={item.href} key={item.href}>
              <MenuItem icon={item.icon!} label={t(item.label)} isActive={pathname === item.href} />
            </Link>
          ))}
        </VStack>
      </VStack>
      <VStack spacing={24}>
        <ActiveSession />
        <HStack spacing={8} align="center">
          {TERMS.map((term, index) => (
            <React.Fragment key={term.href}>
              <Link href={term.href} className="text-secondary-foreground-light text-xs font-medium uppercase">
                {t(term.label)}
              </Link>
              {index < TERMS.length - 1 && <div className="bg-secondary h-1 w-1 rounded-full"></div>}
            </React.Fragment>
          ))}
        </HStack>
      </VStack>
    </VStack>
  )
}
