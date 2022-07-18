import { gql } from "@apollo/client";

export const UsersQuery = gql`
  query userById($idIn: Int, $page: Int, $pageSize: Int) {
    userById(idIn: $idIn) {
      firstName
      lastName
      dogs (page: $page, pageSize: $pageSize) {
        id
        avatarUrl
        breed {
          name
        }
      }
      avatarUrl
    }
  }
`