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

export const AddDogMutation = gql`
  mutation addDog($userIdIn: Int!, $dogIn: DogInput!) {
    addDogToDbAndUserList(userIdIn: $userIdIn, dogIn: $dogIn)
  }
`