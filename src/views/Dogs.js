import React, { useEffect, useState } from 'react'
import { Dialog } from '@mui/material'
import { Image } from 'mui-image'

function Dogs() {
  const [dogsData, setDogsData] = useState()
  const [showDialog, setshowDialog] = useState(false)

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
    const clickedDog = dogsData[i]
    setshowDialog(true)
    console.log('TODO: Make a modal with actions', { clickedDog })
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
      />
    </div>
  );
}

export default Dogs;
