import { gql } from "@apollo/client";

export const DogsQuery = gql`
query DogsQuery {
  dogs {
    id
    breed {
      name
    }
    avatarUrl
  }
}
`

export const UserDogsQuery = gql`
  query GetUserDogs($page: Int!, $pageSize: Int!) {
    myDogs(page: $page, pageSize: $pageSize) {
      data{
        id
        avatarUrl
        breed {
          name
        }
      }
      totalResults
    }
  }
`

export const AddDogMutation = gql`
  mutation addDog($userIdIn: Int!, $dogIn: DogInput!) {
    addDogToDbAndUserList(userIdIn: $userIdIn, dogIn: $dogIn)
  }
`