import { gql } from "@apollo/client";

export const LoginMutation = gql`
mutation login($password: String!, $username: String! ) {
    userAuthenticate(password: $password, username: $username) {
      data {
        success
        jWT
        message
      }
    }
  }
`