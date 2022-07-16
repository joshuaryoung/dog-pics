import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { Image } from 'mui-image'
import { useMutation } from '@apollo/client'
import { AddDogMutation } from '../graphql/dogs.gql'

function Dogs() {
  const [addDog] = useMutation(AddDogMutation)
  const [dogsData, setDogsData] = useState()
  const [showDialog, setshowDialog] = useState(false)
  const [selectedDog, setSelectedDog] = useState(false)

  useEffect(() => {fetchDogs()}, [])

  const handleRefreshClick = e => {
    fetchDogs()
  }

  const fetchDogs = () => {
    try {
      fetch('https://api.thedogapi.com/v1/images/search?limit=10&order=Desc')
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
      <button onClick={handleRefreshClick}>Refresh</button>
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
          <Button onClick={handleSaveDogClicked}>Save</Button>
          <Button onClick={e => setshowDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dogs;
