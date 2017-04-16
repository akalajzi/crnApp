import gql from 'graphql-tag';

// get the user
const USER_QUERY = gql`
  query User($id: ID) {
    User(id: $id) {
      id
      email
      name
      nickname
      notes {
        id
        createdAt
        updatedAt
        text
      }
    }
  }
`
// create user
const USER_CREATE_MUTATION = gql`
  mutation createUser($email: String!, $password: String!){
    createUser(authProvider: {
      email: {
        email: $email
        password: $password
      }
    }) {
      id
    }
  }
`
// login user
const USER_LOGIN_MUTATION = gql`
  mutation signinUser($email: String!, $password: String!){
    signinUser(email: {
      email: $email
      password: $password
    }) {
      token
    }
  }
`

export {
  USER_QUERY,
  USER_CREATE_MUTATION,
  USER_LOGIN_MUTATION,
}
