import InterceptorHelper from "@/InterceptorHelper.ts";
import type {ApiProductRequest, ProductType} from "@/types/types.ts";

export const apiAddNewProduct = (data: ApiProductRequest) => {
    return InterceptorHelper.intercept<ProductType>('product/', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export const apiEditProduct = (data: ProductType, id: number) => {
    return InterceptorHelper.intercept(`product/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

export const apiGetProductDetails: (id: string) => Promise<ProductType> = async (
    id: string
) => {
    return await InterceptorHelper.intercept(`product/${id}/`)
}
