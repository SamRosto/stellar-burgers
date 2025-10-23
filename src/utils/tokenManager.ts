import { deleteCookie, setCookie } from "./cookie";

export const storeTokens = (resfreshToken: string, accesToken: string) => {
    localStorage.setItem('resfreshToken', resfreshToken)
    setCookie('accessToken', accesToken)
}

export const resetTokens = () => {
    localStorage.removeItem('resfreshToken')
    deleteCookie('accessToken')
}