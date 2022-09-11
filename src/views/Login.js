import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import React, { useState } from "react"

function Login () {
    const [usernameModel, setUsernameModel] = useState()
    const [passwordModel, setPasswordModel] = useState()
    return (
        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '20px'}}>
            <Grid item xs={12} sm={5}>
                <Card>
                    <CardHeader title="Login" />
                    <CardContent>
                        <Box component="form">
                            <Grid container rowSpacing={2} justifyContent="center">
                                <Grid item xs={11}>
                                    <TextField label="Username" value={usernameModel} onChange={e => setUsernameModel(e.target.value)} fullWidth required />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField label="Password" type="password" value={passwordModel} onChange={e => setPasswordModel(e.target.value)} fullWidth required />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent={'right'}>
                            <Grid xs={2}>
                                <Button size="medium" variant="outlined">Login</Button>
                            </Grid> 
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login