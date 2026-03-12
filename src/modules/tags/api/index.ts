import InterceptorHelper from "@/InterceptorHelper.ts";
import type {ApiTagRequest, TagType} from "@/types/types.ts";

export const apiAddNewTag = (data: ApiTagRequest) => {
    return InterceptorHelper.intercept<TagType>('dashboard/tags/', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export const apiEditTag = (data: ApiTagRequest, id: number) => {
    return InterceptorHelper.intercept(`dashboard/tags/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

export const apiGetTagDetails: (id: string) => Promise<TagType> = async (
    id: string
) => {
    return await InterceptorHelper.intercept(`dashboard/tags/${id}/`)
}
