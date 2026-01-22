import "pinia"
import type { Router } from "vue-router"

// type TypePaggination = {
//     page: number
//     take: number
//     itemsPerPage: number
//     total: number
//     pageCount: number
//     hasPreviousPage: boolean
//     hasNextPage: boolean
// }

export type BaseResonse = {
    count: number
    next: string | null
    previous: string | null
    message: string
}
export type TypeResponse<TResults> = BaseResonse & {
    results: Array<TResults>
}

export type TypeResponseError = Partial<Error> & {
    message: string
    status?: string
}

declare module "pinia" {
    export interface PiniaCustomProperties {
        $router: Router
    }
}
