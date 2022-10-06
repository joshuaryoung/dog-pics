import { useMutation } from "@apollo/client"
import { LoadingButton } from "@mui/lab"
import { Alert, Box, Card, CardActions, CardContent, CardHeader, Snackbar, Grid, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginMutation } from "../graphql/login.gql"
import { setJwtLocalStorage } from "../security"

function Login ({ principal, setPrincipal }) {
    const navigate = useNavigate()
    const [usernameModel, setUsernameModel] = useState('')
    const [passwordModel, setPasswordModel] = useState('')
    const [loginMutateFunction, { loading, error, reset }] = useMutation(LoginMutation)

    useEffect(() => {
        if (principal && principal.id) {
            navigate(`/users/${principal.id}`, { replace: true })
        }
    }, [principal])

    const handleLoginSubmit = async () => {
        try {
            const res = await loginMutateFunction({ variables: { username: usernameModel, password: passwordModel } })

            const { data: resData } = res ?? {}
            const { userAuthenticate } = resData ?? {}
            const { data } = userAuthenticate ?? {}
            const { jwt, user, expires } = data ?? {}
    
            if (!jwt || !user) {
                return
            }

            setJwtLocalStorage(jwt, expires)

            setPrincipal(state => {
                return {
                    id: user.id,
                    jwt,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })
        } catch (error) {
            console.error(error)
            setTimeout(() => { reset() }, 6000)
        }
    }

    return (
        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '20px'}}>
            <Grid item xs={12} sm={5}>
                <Card>
                    <CardHeader title="Login" />
                    <CardContent>
                        <Box component="form" onSubmit={el => console.log(el)}>
                            <Grid container rowSpacing={2} justifyContent="center">
                                <Grid item xs={11}>
                                    <TextField label="Username" value={usernameModel} onKeyDown={el => el.key === 'Enter' ? handleLoginSubmit() : null } onChange={e => setUsernameModel(e.target.value)} fullWidth required />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField label="Password" type="password" value={passwordModel} onKeyDown={el => el.key === 'Enter' ? handleLoginSubmit() : null } onChange={e => setPasswordModel(e.target.value)} fullWidth required />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent={'right'}>
                            <Grid item xs={2}>
                                <LoadingButton loading={loading} disabled={loading} size="medium" variant="outlined" onClick={handleLoginSubmit}>Login</LoadingButton>
                            </Grid> 
                        </Grid>
                    </CardActions>
                </Card>
                <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={Boolean(error)} autoHideDuration={6000} onClose={reset}>
                    <Alert severity="error">Login Failed. Please Try Again</Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default Login