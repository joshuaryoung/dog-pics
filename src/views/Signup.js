import { useMutation } from "@apollo/client"
import { LoadingButton } from "@mui/lab"
import { Card, CardActions, Grid, TextField, CardHeader, CardContent, Box, Snackbar, Alert, Toolbar } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateUserMutation } from "../graphql/users.gql"

function Signup () {
    const navigate = useNavigate()
    const [usernameModel, setUsernameModel] = useState('')
    const [passwordModel, setPasswordModel] = useState('')
    const [firstNameModel, setFirstNameModel] = useState('')
    const [lastNameModel, setLastNameModel] = useState('')

    const [createUserMutation, { loading, error, reset, data }] = useMutation(CreateUserMutation)

    const handleSignupSubmit = async () => {
        try {
            await createUserMutation({
                variables: {
                    username: usernameModel,
                    password: passwordModel,
                    firstName: firstNameModel,
                    lastName: lastNameModel
                }
            })

            navigate({ pathname: '/login' })
        } catch (error) {
            
        }
    }

    return (
        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '20px'}}>
            <Toolbar />
            <Grid item xs={12} sm={5}>
                <Card>
                    <CardHeader title="Sign Up" />
                    <CardContent>
                        <Box component="form" onSubmit={el => console.log(el)}>
                            <Grid container rowSpacing={2} justifyContent="center">
                                <Grid item xs={11}>
                                    <TextField label="First Name" value={firstNameModel} onKeyDown={el => el.key === 'Enter' ? handleSignupSubmit() : null } onChange={e => setFirstNameModel(e.target.value)} fullWidth required />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField label="Last Name" value={lastNameModel} onKeyDown={el => el.key === 'Enter' ? handleSignupSubmit() : null } onChange={e => setLastNameModel(e.target.value)} fullWidth required />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField label="Email / Username" value={usernameModel} onKeyDown={el => el.key === 'Enter' ? handleSignupSubmit() : null } onChange={e => setUsernameModel(e.target.value)} fullWidth required />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField label="Password" type="password" value={passwordModel} onKeyDown={el => el.key === 'Enter' ? handleSignupSubmit() : null } onChange={e => setPasswordModel(e.target.value)} fullWidth required />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <LoadingButton loading={loading} disabled={loading} size="medium" variant="contained" onClick={handleSignupSubmit}>Sign Up</LoadingButton>
                            </Grid> 
                        </Grid>
                    </CardActions>
                </Card>
                <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={Boolean(error || (data && data.userCreate && data.userCreate.data && !data.userCreate.data.success))} autoHideDuration={6000} onClose={reset}>
                    <Alert severity="error">{(error && error.message) || (data && data.userCreate && data.userCreate.data && data.userCreate.data.message)}</Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default Signup