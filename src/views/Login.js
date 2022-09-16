import { useMutation } from "@apollo/client"
import { LoadingButton } from "@mui/lab"
import { Alert, Box, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { LoginMutation } from "../graphql/login.gql"

function Login () {
    const [usernameModel, setUsernameModel] = useState('')
    const [passwordModel, setPasswordModel] = useState('')
    const [loginMutateFunction, { data, loading, error }] = useMutation(LoginMutation)

    const handleLoginSubmit = async () => {
        await loginMutateFunction({ variables: { username: usernameModel, password: passwordModel } })
    }

    return (
        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '20px'}}>
            <Grid item xs={12} sm={5}>
                <Card>
                    <CardHeader title="Login" />
                    <CardContent>
                        {error && <Alert severity="error">There was an error logging in! Please try again or contact support!</Alert>}
                        <Box component="form" onSubmit={el => console.log(el)}>
                            <Grid container rowSpacing={2} justifyContent="center">
                                <Grid item xs={11}>
                                    <TextField label="Username" value={usernameModel} onChange={e => setUsernameModel(e.target.value)} fullWidth required />
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
                                <LoadingButton loading={loading} disabled={loading} size="medium" variant="outlined">Login</LoadingButton>
                            </Grid> 
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login