import { envConfig } from '@/core/configs/env.config'
import { IAxiosResponse } from '@/core/types/api.type'
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/**
 * Async signature is intentional — blocks implementers from defaulting to
 * localStorage (XSS exfil vector). Enables server-proxy / httpOnly cookie patterns.
 *
 * @todo Implement token retrieval. Recommended: server-side proxy OR
 *       httpOnly cookie forwarded via server action.
 *       Forbidden: localStorage/sessionStorage (XSS risk).
 * Currently returns null — demo stub, requests sent unauthenticated.
 */
async function getAuthToken(): Promise<string | null> {
    return null
}

/**
 * @todo Implement refresh token flow. Returns new access token or null.
 * Currently returns null — demo stub, no refresh attempted on 401.
 *
 * When implementing, MUST include:
 *   1. `_retry` sentinel on error.config to prevent infinite loops
 *   2. Shared in-flight refresh promise (thundering herd guard)
 *   3. Explicit exclusion of /refresh endpoint from this interceptor
 */
async function refreshAuthToken(): Promise<string | null> {
    return null
}

// Keep reference to avoid unused-variable lint while stub is in place.
void refreshAuthToken

const createAxiosInstance = (baseURL: string) => {
    const instance = axios.create({ baseURL })

    const handleSuccess = (response: AxiosResponse) => response

    const handleError = async (error: AxiosError) => {
        const responseData = error.response?.data as IAxiosResponse | undefined

        // @todo 401 refresh flow — see refreshAuthToken() guards above
        // if (responseData?.statusCode === 401) {
        //     const token = await refreshAuthToken()
        //     if (token && error.config) {
        //         error.config.headers.Authorization = `Bearer ${token}`
        //         return instance(error.config)
        //     }
        // }

        return Promise.reject(responseData ?? error)
    }

    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const token = await getAuthToken()
            if (token) config.headers.Authorization = `Bearer ${token}`
            return config
        },
        (error) => Promise.reject(error),
    )

    instance.interceptors.response.use(handleSuccess, handleError)

    return instance
}

export const request = createAxiosInstance(envConfig.API_URL)
