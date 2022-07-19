import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { UsersQuery } from '../graphql/users.gql';
import { UserDogsQuery } from '../graphql/dogs.gql';
import { useParams } from 'react-router-dom';
import { Image } from 'mui-image'
import { TablePagination } from '@mui/material';

function App() {
  const { userId } = useParams()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const { data: userData } = useQuery(UsersQuery, { variables: { idIn: parseInt(userId) }, fetchPolicy: 'network-only'})
  const { data: dogData } = useQuery(UserDogsQuery, { variables: { idIn: parseInt(userId), page, pageSize }, fetchPolicy: 'network-only'})

  return (
    <div>
      {userData && userData.userById && 
      <div>
        <div>{`${userData.userById.firstName} ${userData.userById.lastName}`}</div>
        <div>
          <Image src={userData.userById.avatarUrl} height="200px" width="329px" fit="cover"/>
        </div>
      </div>
      }
      <div>Saved Dogs</div>
      <div id="saved-dogs-container">
      {dogData && dogData.userDogs && dogData.userDogs.data &&
      dogData.userDogs.data.map(dog => {
        return <Image key={dog.id} src={dog.avatarUrl} height="200px" width="200px" fit="contain"/>
      })
      
    }
    { dogData && 
    <TablePagination
      count={dogData.userDogs.totalResults}
      page={page}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[1, 5, 10, 50]}
      onPageChange={(e, page) => setPage(page)}
      onRowsPerPageChange={(e, { props }) => {
        setPageSize(props.value)
        setPage(0)
      }}
    />
    }
      </div>
    </div>
  );
}

export default App;
