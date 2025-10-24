import { deleteCookie, setCookie } from "./cookie";

export const storeTokens = (refreshToken: string, accesToken: string) => {
    localStorage.setItem('refreshToken', refreshToken)
    setCookie('accessToken', accesToken)
}

export const resetTokens = () => {
    localStorage.removeItem('refreshToken')
    deleteCookie('accessToken')
}