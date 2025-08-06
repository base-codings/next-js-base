'use client'

import { useAsyncEffect } from '@/hooks/useAsyncEffect'
import useAuthStore, { setAuthStore } from '@/stores/useAuthStore'
import { FCC } from '@/types'
import { useAppKitAccount } from '@reown/appkit/react'
import React, { useRef } from 'react'
import { COOKIES, getCookie } from '../cookie'
import useTranslations from '@/hooks/useTranslations'
import { authLogin, authLogout } from '@/utils/auth'
import { useAccount, useSignMessage } from 'wagmi'
import { getNonceRequest, loginWalletRequest } from '@/apis/auths'
import { Toast } from '@/components/common'

const AuthProvider: FCC = ({ children }) => {
  const { address, isConnected, status } = useAppKitAccount()
  const { connector } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { t } = useTranslations('common')
  const isLogged = useAuthStore((state) => state.isLogged)

  const isSigning = useRef(false)
  const isRetryingLogin = useRef(false)

  const signMessage = async () => {
    if (isSigning.current) return

    isSigning.current = true

    try {
      setAuthStore({ isLogging: true })
      const nonce = await getNonceRequest({ public_key: address as string })

      const message = nonce?.data?.message
      let signature = ''

      signature = await signMessageAsync({
        message: message,
        account: address as `0x${string}`,
        connector,
      })

      const result = await loginWalletRequest({
        public_key: address as string,
        signature,
      })

      authLogin({
        userAddress: address as string,
        accessToken: result?.data?.accessToken,
      })

      Toast.success({ label: t('message.successfull'), description: t('message.connected_success') })
    } catch (err: unknown) {
      await authLogout()
      Toast.error({ label: t('message.failed'), description: String((err as { message: string })?.message || err) })
    } finally {
      isSigning.current = false
    }
  }

  useAsyncEffect(async () => {
    if (!address || !isConnected) {
      if (isLogged) await authLogout()
      setAuthStore({ isLogging: false })
      return
    }

    if (isLogged || isSigning.current) return

    const cookiesValue = {
      address: getCookie(COOKIES.ADDRESS) || '',
      userToken: getCookie(COOKIES.TOKEN) || '',
    }

    const hasValidCookies = cookiesValue.address && cookiesValue.userToken
    const isSameAddress = cookiesValue.address === address

    try {
      if (hasValidCookies && isSameAddress) {
        if (!isRetryingLogin.current) {
          isRetryingLogin.current = true
          await authLogin({
            userAddress: cookiesValue.address as string,
            accessToken: cookiesValue.userToken as string,
          })
          setAuthStore({ isLogging: false })
          Toast.success({ label: t('message.successfull'), description: t('message.connected_success') })
        }
      } else if (hasValidCookies && !isSameAddress) {
        await authLogout()
      } else {
        await signMessage()
        setAuthStore({ isLogged: true })
        setAuthStore({ isLogging: false })
      }
    } catch {
      isRetryingLogin.current = false
      await authLogout()
      setAuthStore({ isLogging: false })
      throw new Error('Auth Fail!')
    }
  }, [address, isConnected, status, isLogged])

  return <>{children}</>
}

export default AuthProvider
