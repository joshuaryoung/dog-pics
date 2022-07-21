import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UsersQuery, RemoveDogFromUserList } from '../graphql/users.gql';
import { UserDogsQuery } from '../graphql/dogs.gql';
import { useParams } from 'react-router-dom';
import { Image } from 'mui-image'
import { Avatar, TablePagination } from '@mui/material';

function App() {
  const { userId } = useParams()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(12)
  const [removeDog, { called, loading, error }] = useMutation(RemoveDogFromUserList)
  const { data: userData } = useQuery(UsersQuery, { variables: { idIn: parseInt(userId) }, fetchPolicy: 'network-only'})
  const { data: dogData } = useQuery(UserDogsQuery, { variables: { idIn: parseInt(userId), page, pageSize }, fetchPolicy: 'network-only'})

  const handleDogClick = (dogIdIn, userIdIn) => {
    console.log({dogIdIn, userIdIn}, 'TODO: - Confirmation Dialog - Snackbar Feedback')
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
    </div>
  );
}

export default App;
