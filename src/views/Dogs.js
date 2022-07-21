import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { Image } from 'mui-image'
import { useMutation } from '@apollo/client'
import { AddDogMutation } from '../graphql/dogs.gql'
import { useTheme } from '@mui/system'
import { LoadingButton } from '@mui/lab'

function Dogs() {
  const theme = useTheme()
  const [addDog, { called, loading, error }] = useMutation(AddDogMutation)
  const [dogsData, setDogsData] = useState()
  const [showDialog, setshowDialog] = useState(false)
  const [selectedDog, setSelectedDog] = useState(false)

  useEffect(() => {fetchDogs()}, [])
  useEffect(() => { if (called) afterMutationCalled() }, [called])

  const afterMutationCalled = () => {
    console.log('here')
  }

  const handleRefreshClick = e => {
    fetchDogs()
  }

  const fetchDogs = () => {
    try {
      fetch('https://api.thedogapi.com/v1/images/search?limit=12&order=Desc')
      .then(res => res.json())
      .then(data => {
        setDogsData(data)
      })
    } catch(error) {
      console.error(error)
    }
  }

  const handleDogImgClicked = i => {
    if (!dogsData[i]) {
      console.warn(`dogsData[i] is ${dogsData[i]}`)
      return
    }

    setSelectedDog(dogsData[i])
    setshowDialog(true)
  }

  const handleSaveDogClicked = async e => {
    const dogIn = {
      id: selectedDog.id,
      breed: selectedDog.breed,
      avatarUrl: selectedDog.url
    }
    await addDog({ variables: { dogIn, userIdIn: 1000 } })
    setshowDialog(false)
  }

  return (
    <div>
      <Button variant="contained" className="dog-refresh-button" style={{marginTop: '20px', backgroundColor: theme.palette.primary.dark }} onClick={handleRefreshClick}>Refresh</Button>
      <div id="dog-container">
        { dogsData && dogsData.map((dog, i) => (
        <div className="dog-pic-div" key={dog.id}>
          <Image
            onClick={e => handleDogImgClicked(i)}
            src={dog.url}
            width="329px"
            height="200px"
            fit="cover"
            showLoading
          />
        </div>))
        }
      </div>

      <Dialog
        open={showDialog}
        onClose={e => setshowDialog(false)}
      >
        <DialogTitle>
          Save to Profile?
        </DialogTitle>
        <DialogActions>
          <LoadingButton variant="contained" loading={loading} onClick={handleSaveDogClicked} color="success">Save</LoadingButton>
          <LoadingButton variant="contained" loading={loading} onClick={e => setshowDialog(false)} color="secondary">Cancel</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dogs;
