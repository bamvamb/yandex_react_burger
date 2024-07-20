
export const backendUrl = 'https://norma.nomoreparties.space/'
export const apiUrl = backendUrl + 'api/'

export const protectedApiRoutes:string[] = [
    "auth/user",
    "auth/logout",
    "orders"
]

export const jsonHeader:{[key:string]: string} = {
    'Content-Type': 'application/json',
}

export const jwt_expired_403:string = "jwt expired"
export const jwt_malformed_403:string = "jwt malformed"