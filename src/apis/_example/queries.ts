// _example domain scaffold — delete or replace when first real domain added

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as requests from './requests'
import type { CreateExampleDto } from './types'

const exampleKeys = {
    all: ['examples'] as const,
    lists: () => [...exampleKeys.all, 'list'] as const,
}

export const useExamples = () =>
    useQuery({
        queryKey: exampleKeys.lists(),
        queryFn: () => requests.getExamples(),
    })

export const useCreateExample = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateExampleDto) => requests.createExample(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: exampleKeys.all }),
    })
}
