import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Dialog, DialogActions, DialogTitle, Grid, Snackbar, Toolbar } from '@mui/material'
import { Image } from 'mui-image'
import { useMutation } from '@apollo/client'
import { AddDogMutation } from '../graphql/dogs.gql'
import { useTheme } from '@mui/system'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

function Dogs({ principal }) {
  console.log({ principal })
  const navigate = useNavigate()
  const theme = useTheme()
  const [addDog, { loading, error: mutationError }] = useMutation(AddDogMutation)
  const [dogsData, setDogsData] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState()
  const [snackbarSeverity, setSnackbarSeverity] = useState()
  const [selectedDog, setSelectedDog] = useState(false)

  useEffect(() => {fetchDogs()}, [])
  useEffect(() => {
    if (!mutationError) {
      return
    }
    setSnackbarMessage('There was a problem adding that dog! Please try again or contact support!')
    setSnackbarSeverity('error')
    setShowSnackbar(true)
  }, [mutationError])

  const handleRefreshClick = e => {
    fetchDogs()
  }

  const fetchDogs = () => {
    try {
      fetch('https://api.thedogapi.com/v1/images/search?limit=8&order=Desc')
      .then(res => res.json())
      .then(data => {
        setDogsData(data)
      })
    } catch(error) {
      console.error(error)
      setSnackbarMessage('There was a problem retrieving the dogs! Please try again or contact support!')
      setSnackbarSeverity('error')
      setShowSnackbar(true)
    }
  }

  const handleDogImgClicked = i => {
    if (!dogsData[i]) {
      console.warn(`dogsData[i] is ${dogsData[i]}`)
      return
    }

    setSelectedDog(dogsData[i])
    setShowDialog(true)
  }

  const handleSaveDogClicked = async e => {
    if (!(principal && principal.jwt)) {
      navigate({ pathname: '/login' })
    }
  
    const dogIn = {
      id: selectedDog.id,
      breed: selectedDog.breed,
      avatarUrl: selectedDog.url
    }
    await addDog({ variables: { dogIn, userIdIn: principal.id } })
    setSnackbarMessage('Dog successfully added!')
    setSnackbarSeverity('success')
    setShowSnackbar(true)
    setShowDialog(false)
  }

  return (
    <Grid container alignItems="center" sx={{ minHeight: '100vh' }}>
      <Toolbar sx={{ marginBottom: '20px' }} />
      <Grid container item wrap='wrap' columnSpacing={3} rowSpacing={2} justifyContent="center">
        { dogsData && dogsData.map((dog, i) => (
        <Grid item xs={'auto'} sm={'auto'} key={dog.id}>
          <Image
            onClick={e => handleDogImgClicked(i)}
            src={dog.url}
            width="329px"
            height="200px"
            fit="cover"
            showLoading
            className='dog-pic'
          />
        </Grid>))
        }
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button variant="contained" className="dog-refresh-button" style={{marginTop: '20px', backgroundColor: theme.palette.primary.dark }} onClick={handleRefreshClick}>Refresh</Button>
        </Grid>
      </Grid>
      

      <Dialog
        open={showDialog}
        onClose={e => setShowDialog(false)}
      >
        <DialogTitle>
          Save to Personal Collection?
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <LoadingButton variant="contained" loading={loading} onClick={handleSaveDogClicked} color="success">Save</LoadingButton>
          <LoadingButton variant="contained" onClick={e => setShowDialog(false)} color="secondary">Cancel</LoadingButton>
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

export default Dogs;
