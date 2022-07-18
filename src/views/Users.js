import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { UsersQuery } from '../graphql/users.gql';
import { useParams } from 'react-router-dom';
import { Image } from 'mui-image'
import { TablePagination } from '@mui/material';

function App() {
  const { userId } = useParams()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const { data: userData } = useQuery(UsersQuery, { variables: { idIn: parseInt(userId), page, pageSize }, fetchPolicy: 'network-only'})

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
      {userData && userData.userById && userData.userById.dogs &&
      userData.userById.dogs.map(dog => {
        return <Image key={dog.id} src={dog.avatarUrl} height="200px" width="200px" fit="contain"/>
      })
      
    }
    <TablePagination
      count={100}
      page={page}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[1, 5, 10, 50]}
      onPageChange={(e, page) => setPage(page)}
      onRowsPerPageChange={(e, { props }) => setPageSize(props.value) }
    />
      </div>
    </div>
  );
}

export default App;
