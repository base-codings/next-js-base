'use client'

import { envConfig } from '@/configs/envConfig'
import ReactDOM from 'react-dom'

export function PreloadResources() {
    ReactDOM.preconnect(envConfig.API_URL, { crossOrigin: 'anonymous' })
    return <></>
}
