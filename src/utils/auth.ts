import jsonwebtoken from 'jsonwebtoken'
import moment from 'moment'
import { COOKIES, removeCookie, setCookie } from '@/libs/cookie'
import { setAuthStore } from '@/stores/useAuthStore'
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from '@/configs/wagmi'

export const authLogin = async ({ userAddress, accessToken }: { userAddress: string; accessToken: string }) => {
  const defaultTimeExpired = moment().add(7, 'day').unix().valueOf()
  const decoded = jsonwebtoken.decode(accessToken)
  const decodeToken: jsonwebtoken.JwtPayload | undefined =
    typeof decoded === 'object' && decoded !== null ? (decoded as jsonwebtoken.JwtPayload) : undefined
  const expiredTime = moment.unix(Number(decodeToken?.exp || 0)).valueOf() || defaultTimeExpired

  setAuthStore({ isLogged: true, isLogging: false, userAddress, accessToken })
  setCookie(COOKIES.TOKEN, accessToken, {
    expires: new Date(expiredTime),
    path: '/',
  })
  setCookie(COOKIES.ADDRESS, userAddress, {
    expires: new Date(expiredTime),
    path: '/',
  })
}

export const authLogout = async () => {
  try {
    await disconnect(wagmiConfig)
  } catch {}

  removeCookie(COOKIES.ADDRESS)
  removeCookie(COOKIES.TOKEN)

  setAuthStore({
    isLogged: false,
    isLogging: false,
    accessToken: undefined,
    userAddress: undefined,
  })
}
