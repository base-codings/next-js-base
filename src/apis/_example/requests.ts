// _example domain scaffold — delete or replace when first real domain added

import { request } from '@/apis/axios'
import type { IAxiosResponse } from '@/core/types/api.type'
import type { ExampleItem, CreateExampleDto } from './types'

export const getExamples = (): Promise<IAxiosResponse<ExampleItem[]>> => {
    return request.get('/v1/examples')
}

export const createExample = (data: CreateExampleDto): Promise<IAxiosResponse<ExampleItem>> => {
    return request.post('/v1/examples', data)
}
