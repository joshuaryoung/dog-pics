import { gql } from "@apollo/client";

export const UsersQuery = gql`
  query userById($idIn: Int) {
    userById(idIn: $idIn) {
      firstName
      lastName
      avatarUrl
    }
  }
`

export const RemoveDogFromUserList = gql`
  mutation RemoveUserDog ($idIn: Int!, $dogIdIn: String!) {
    removeDogFromUserList(dogIdIn: $dogIdIn, userIdIn: $idIn) {
      data
    }
  }
`