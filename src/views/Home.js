import { Container, Grid, Typography } from '@mui/material';
import React from 'react';

function App() {
  return (
    <Container sx={{ marginTop: '70px' }}>
      <Grid container justifyContent="center">
        <Grid xs={12} item>
          <Typography textAlign="center" variant="h3">
            Welcome to Dog Connoisseur
          </Typography>
        </Grid>
        <Grid xs={12} item mt="120px">
          <Typography variant="h5" textAlign="center">
            Imagine having a collection of your favorite dog pics organized in one place
          </Typography>
        </Grid>
        <Grid xs={12} item mt="10px">
          <Typography variant="h5" textAlign="center">
            Now you can with Dog Connoisseur!
          </Typography>
        </Grid>
        <Grid xs={12} item mt="10px">
          <Typography variant="h5" textAlign="center">
            Create your account now to get started
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
