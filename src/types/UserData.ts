export type UserImage = {
    id: number
    file_name: string
    url?: string
    mime_type?: string
    size?: number
}

export type Permission = {
    id: number
    name: string
    title: string
}

export type Role = {
    id: number
    name: string
    title?: string
    permissions?: Permission[]
}
export type UserStatus = 'active' | 'inactive' | (string & {})

export interface UserDataResponse {
    id: number
    name: string
    username: string
    email: string
    phone: string | null
    status: UserStatus
    created_at: string

    image: UserImage | null

    roles: Role[]
    permissions: Permission[]
}

export interface ApiLoginResponse {
    token: string,
    admin: UserDataResponse
}
export interface ApiLoginRequest {
    email: string,
    password: string
    type?: number
}