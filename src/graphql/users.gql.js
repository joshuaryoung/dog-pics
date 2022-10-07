import { gql } from "@apollo/client";

export const UsersQuery = gql`
  query GetUser {
    me {
      firstName
      lastName
      avatarUrl
    }
  }
`

export const PrincipalQuery = gql`
  query GetPrincipal {
    me {
      firstName
      lastName
      id
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