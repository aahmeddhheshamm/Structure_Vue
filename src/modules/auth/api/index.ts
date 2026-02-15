import InterceptorHelper from "@/InterceptorHelper.ts";
import type {ApiLoginRequest, ApiLoginResponse} from "@/types/UserData.ts";

export const apiLogin = (data: ApiLoginRequest) => {
    return InterceptorHelper.intercept<ApiLoginResponse>('auth/login/', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export const apiRegister = (data: any) => {
    return InterceptorHelper.intercept('register/', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}