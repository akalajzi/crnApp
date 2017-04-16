import gql from 'graphql-tag';

const NOTES_BY_USER_QUERY = gql`
  query Notes($userId: ID) {
    allNotes(filter: {
      user: {id: $userId}
    }) {
      id
      createdAt
      updatedAt
      text
    }
  }
`

export {
  NOTES_BY_USER_QUERY,
}
