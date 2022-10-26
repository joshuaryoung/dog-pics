import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UsersQuery, RemoveDogFromUserList } from '../graphql/users.gql';
import { UserDogsQuery } from '../graphql/dogs.gql';
import { useNavigate } from 'react-router-dom';
import { Image } from 'mui-image'
import { Avatar, TablePagination, Dialog, DialogActions, DialogTitle, Snackbar, Alert, Grid, Toolbar, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import { getJwtFromLocalStorage } from '../security';
import jwtDecode from 'jwt-decode';

function App({ principal }) {
  const navigate = useNavigate()
  const jwt = getJwtFromLocalStorage()
  let jwtId
  if (jwt) {
    const decodedJwt = jwtDecode(jwt) ?? {}
    jwtId = decodedJwt.id ? parseInt(decodedJwt.id) : null
  }
  // debugger
  const userId = (principal && principal.id) ?? jwtId

  useEffect(() => {
    if (!userId) {
      navigate({ pathname: '/login' })
    }
  }, [])

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(12)
  const [showDialog, setshowDialog] = useState(false)
  const [selectedDogId, setSelectedDogId] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState()
  const [snackbarSeverity, setSnackbarSeverity] = useState()
  const [removeDog, { loading, error: mutationError }] = useMutation(RemoveDogFromUserList)
  const { data: userData, error: userError } = useQuery(UsersQuery, { fetchPolicy: 'network-only'})
  const { data: dogData, refetch: refetchUserDogs, error: dogQueryError } = useQuery(UserDogsQuery, { variables: { idIn: userId, page, pageSize }, fetchPolicy: 'network-only'})

  useEffect(() => {
    if (dogQueryError) {
      setSnackbarMessage('There was a problem retrieving your dogs! Please try again or contact support!')
      setSnackbarSeverity('error')
      setShowSnackbar(true)

    }

    if (userError) {
      setSnackbarMessage('There was a problem retrieving your account details! Please try again or contact support!')
      setSnackbarSeverity('error')
      setShowSnackbar(true)
    }
    
    if (mutationError) {
      setSnackbarMessage('There was a problem adding that dog! Please try again or contact support!')
      setSnackbarSeverity('error')
      setShowSnackbar(true)
    }
  }, [mutationError, dogQueryError, userError])

  const handleDogClick = (dogIdIn, userIdIn) => {
    setSelectedDogId(dogIdIn)
    setshowDialog(true)
  }

  const handleRemoveDogClicked = async () => {
    try {
      await removeDog({ variables: { idIn: userId, dogIdIn: selectedDogId } })
      setSnackbarMessage('Dog successfully removed!')
      setSnackbarSeverity('success')
      setShowSnackbar(true)
      setshowDialog(false)
      await refetchUserDogs()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid container alignItems="center" sx={{ minHeight: '100vh' }}>
      <Toolbar sx={{ marginBottom: '20px' }} />
      {userData && userData.me && 
      <Grid item container justifyContent={{ xs: 'center', sm: 'left' }} xs={12} rowSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" textAlign={{ xs: 'center', sm: 'left' }}>
            {`${userData.me.firstName} ${userData.me.lastName}`}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            src={userData.me.avatarUrl}
            sx={{ width: 120, height: 120 }}
          />  
        </Grid>
      </Grid>
      }
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" textAlign={{ xs: 'center', sm: 'left' }} style={{ marginTop: '20px' }}>Saved Dogs</Typography>
        </Grid>
      </Grid>
      <Grid container wrap="wrap" justifyContent={{xs: 'center'}} columns={4} columnSpacing={3} rowSpacing={2}>
        {dogData && dogData.myDogs && dogData.myDogs.data &&
        dogData.myDogs.data.map(dog => {
          return (
            <Grid item key={dog.id}>
              <Image
                src={dog.avatarUrl}
                width="329px"
                height="180px"
                fit="cover"
                showLoading
                onClick={el => handleDogClick(dog.id, userId)}
                className='dog-pic'
              />
            </Grid>
                )
        })
        
      }
      </Grid>
      { dogData && 
      <Grid container justifyContent="center">
        <Grid item>
          <table>
            <tbody>
              <tr>
                <TablePagination
                  count={dogData.myDogs.totalResults}
                  page={page}
                  rowsPerPage={pageSize}
                  rowsPerPageOptions={[4, 8, 12]}
                  onPageChange={(e, page) => setPage(page)}
                  onRowsPerPageChange={(e, { props }) => {
                    setPageSize(props.value)
                    setPage(0)
                  }}
                />
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>
      }

      <Dialog
        open={showDialog}
        onClose={e => setshowDialog(false)}
      >
        <DialogTitle>
          Remove From Personal Collection?
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <LoadingButton variant="contained" loading={loading} onClick={handleRemoveDogClicked} color="error">Remove</LoadingButton>
          <LoadingButton variant="contained" onClick={e => setshowDialog(false)} color="secondary">Cancel</LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={e => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Grid>
  );
}

export default App;
