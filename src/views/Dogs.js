import { useQuery } from '@apollo/client';
import React from 'react';
import { DogsQuery } from '../graphql/dogs.gql'
import { Image } from 'mui-image'

function Dogs() {
  const { error, data: dogsData, refetch } = useQuery(DogsQuery)
  
  if (error) {
    console.error(error)
  }

  const handleRefreshClick = async e => {
    await refetch()
  }

  return (
    <div>
      <button onClick={handleRefreshClick}>Refresh</button>
      <div id="dog-container">
        { dogsData && dogsData.dogs && dogsData.dogs.map((dog, i) => (
        <div className="dog-pic-div" key={dog.id}>
          {console.log({dog})}
          <Image
            src={dog.avatarUrl}
            width="329px"
            height="200px"
            fit="cover"
            showLoading
          />
        </div>))
        }
      </div>
    </div>
  );
}

export default Dogs;
