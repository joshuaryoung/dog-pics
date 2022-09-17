export const getJwtFromCookies = () => {
    const cookiesString = document.cookie
    const parsedCookies = cookiesString.split(';').filter(el => el).map(el => {
        const [key, val] = (el && el.split('=')) ?? [null, null]
        if (!key) {
            return null
        }
        return { key, val }
    })
    const jwt = (parsedCookies.find(el => el.key === 'jwt') ?? {}).val

    return jwt
}

export const setJwtCookie = (jwt, expires) => {
    const expDateString = new Date(expires).toGMTString()
    const cookieString = `jwt=${jwt}; Expires=${expDateString}; SameSite=Strict`
    document.cookie = cookieString
}
