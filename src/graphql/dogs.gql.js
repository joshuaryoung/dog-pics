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