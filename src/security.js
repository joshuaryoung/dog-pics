export const getJwtFromLocalStorage = () => {
    let jwt = ''
    const { token, expires } = JSON.parse(localStorage.getItem('jwt') ?? '{}')
    if (!expires || expires <= new Date()) {
        deleteJwtToken()
        return jwt
    }
    jwt = `Bearer ${token}`

    return jwt
}

export const setJwtLocalStorage = (jwt, expires) => {
    const expDate = new Date(expires)
    const tokenObj = { token: jwt, expires: expDate }
    localStorage.setItem('jwt', JSON.stringify(tokenObj))
}

export const deleteJwtToken = () => {
    localStorage.removeItem('jwt')
}
