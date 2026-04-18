import axios from 'axios'
import { IAxiosResponse } from '@/core/types/api.type'
import { i18n } from '@lingui/core'
import { msg } from '@lingui/core/macro'

const DEFAULT_ERROR_MESSAGE = i18n._(msg`Something went wrong with our system. Please try again!`)

export function encodeQueryData(data: Record<string, string | number | boolean>) {
    const ret: string[] = []
    for (const d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(String(data[d])))
    return ret.join('&')
}

/**
 * Uses hasOwnProperty.call to avoid prototype-chain traversal
 * (defends against prototype-polluted error payloads).
 * Accepts any object with success / message / statusCode — backend error
 * shapes often have { statusCode, message } without success.
 */
function isApiResponse(value: unknown): value is IAxiosResponse {
    if (typeof value !== 'object' || value === null) return false
    const hasOwn = Object.prototype.hasOwnProperty
    return hasOwn.call(value, 'success') || hasOwn.call(value, 'message') || hasOwn.call(value, 'statusCode')
}

export function handleApiError(error: unknown): Error {
    // Check AxiosError first — it has `.message` inherited from Error and would
    // otherwise match isApiResponse, losing the structured response.data.message path.
    if (axios.isAxiosError(error)) {
        return new Error(error.response?.data?.message ?? error.message ?? DEFAULT_ERROR_MESSAGE)
    }

    if (isApiResponse(error)) {
        return new Error(error.message ?? DEFAULT_ERROR_MESSAGE)
    }

    if (error instanceof Error) return new Error(error.message)

    return new Error(DEFAULT_ERROR_MESSAGE)
}
