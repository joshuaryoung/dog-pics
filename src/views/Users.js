import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UsersQuery, RemoveDogFromUserList } from '../graphql/users.gql';
import { UserDogsQuery } from '../graphql/dogs.gql';
import { useParams } from 'react-router-dom';
import { Image } from 'mui-image'
import { Avatar, TablePagination, Dialog, DialogActions, DialogTitle, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab'

function App() {
  const { userId } = useParams()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(12)
  const [showDialog, setshowDialog] = useState(false)
  const [selectedDogId, setSelectedDogId] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState()
  const [snackbarSeverity, setSnackbarSeverity] = useState()
  const [removeDog, { loading, error: mutationError }] = useMutation(RemoveDogFromUserList)
  const { data: userData, error: userError } = useQuery(UsersQuery, { variables: { idIn: parseInt(userId) }, fetchPolicy: 'network-only'})
  const { data: dogData, refetch: refetchUserDogs, error: dogQueryError } = useQuery(UserDogsQuery, { variables: { idIn: parseInt(userId), page, pageSize }, fetchPolicy: 'network-only'})

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
    console.log({dogIdIn, userIdIn}, 'TODO: - Confirmation Dialog - Snackbar Feedback')
  }

  const handleRemoveDogClicked = async () => {
    try {
      await removeDog({ variables: { idIn: parseInt(userId), dogIdIn: selectedDogId } })
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
    <div>
      {userData && userData.userById && 
      <div>
        <div style={{ marginTop: '20px' }}>{`${userData.userById.firstName} ${userData.userById.lastName}`}</div>
        <div style={{ marginTop: '10px' }}>
          <Avatar
            src={userData.userById.avatarUrl}
            sx={{ width: 120, height: 120 }}
          />  
        </div>
      </div>
      }
      <div style={{ marginTop: '20px' }}>Saved Dogs</div>
      <div id="saved-dogs-container">
        {dogData && dogData.userDogs && dogData.userDogs.data &&
        dogData.userDogs.data.map(dog => {
          return <Image
                  key={dog.id}
                  src={dog.avatarUrl}
                  width="329px"
                  height="200px"
                  fit="cover"
                  showLoading
                  onClick={el => handleDogClick(dog.id, userId)}
                />
        })
        
      }
      </div>
      { dogData && 
      <TablePagination
        count={dogData.userDogs.totalResults}
        page={page}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[4, 8, 12]}
        onPageChange={(e, page) => setPage(page)}
        onRowsPerPageChange={(e, { props }) => {
          setPageSize(props.value)
          setPage(0)
        }}
      />
      }

      <Dialog
        open={showDialog}
        onClose={e => setshowDialog(false)}
      >
        <DialogTitle>
          Remove From Profile?
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
    </div>
  );
}

export default App;
