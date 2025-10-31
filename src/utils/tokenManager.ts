import { deleteCookie, setCookie } from "./cookie";

export const storeTokens = (refreshToken: string, accessToken: string) => {
    localStorage.setItem('refreshToken', refreshToken)
    setCookie('accessToken', accessToken)
}

export const resetTokens = () => {
    localStorage.removeItem('refreshToken')
    deleteCookie('accessToken')
}