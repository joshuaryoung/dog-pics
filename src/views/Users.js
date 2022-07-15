import React from 'react';
import { useQuery } from '@apollo/client';
import { UsersQuery } from '../graphql/users.gql';
// eslint-disable-next-line
import { useParams } from 'react-router-dom';
import { Image } from 'mui-image'

function App() {
  const { userId } = useParams()
  const { error, data: userData, refetch } = useQuery(UsersQuery, { variables: { idIn: parseInt(userId) }})

  return (
    <div>
      {console.log({userData})}
      {userData && userData.userById && 
      <div>
        <div>{`${userData.userById.firstName} ${userData.userById.lastName}`}</div>
        <Image src={userData.userById.avatarUrl} height="200px" width="200px" fit="contain"/>
      </div>
      }
    </div>
  );
}

export default App;
