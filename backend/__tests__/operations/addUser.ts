import gql from "graphql-tag";

export default gql`
  mutation createUser($data: NewUserInputType!) {
    createUser(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;
