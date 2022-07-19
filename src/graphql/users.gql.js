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