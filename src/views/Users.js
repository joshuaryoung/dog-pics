import React from 'react';
import { useQuery } from '@apollo/client';
import { UsersQuery } from '../graphql/users.gql';
import { useParams } from 'react-router-dom';
import { Image } from 'mui-image'

function App() {
  const { userId } = useParams()
  const { data: userData } = useQuery(UsersQuery, { variables: { idIn: parseInt(userId) }})

  return (
    <div>
      {userData && userData.userById && 
      <div>
        <div>{`${userData.userById.firstName} ${userData.userById.lastName}`}</div>
        <Image src={userData.userById.avatarUrl} height="200px" width="200px" fit="contain"/>
      </div>
      }
      <div>Saved Dogs</div>
      <div id="saved-dogs-container">
      {userData && userData.userById && userData.userById.dogs &&
      userData.userById.dogs.map(dog => {
        return <Image key={dog.id} src={dog.avatarUrl} height="200px" width="200px" fit="contain"/>
      })
      }
      </div>
    </div>
  );
}

export default App;
