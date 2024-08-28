import gql from "graphql-tag";

export default gql`
 query Profile {
  profile {
    firstName
    lastName
  }
}
`; 
