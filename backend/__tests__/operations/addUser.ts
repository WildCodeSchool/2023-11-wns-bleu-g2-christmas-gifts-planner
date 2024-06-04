import gql from "graphql-tag";

export default gql`
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;
