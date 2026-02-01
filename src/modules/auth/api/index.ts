import InterceptorHelper from "@/InterceptorHelper.ts";

export const apiLogin = (data: any) => {
    return InterceptorHelper.intercept('admin/auth/login/', {
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