import gql from 'graphql-tag';

const NOTE_FRAGMENT = gql`
  fragment NoteFragment on Note {
    id
    createdAt
    updatedAt
    text
  }
`

const NOTES_BY_USER_QUERY = gql`
  query Notes($userId: ID) {
    allNotes(filter: {
      user: {id: $userId}
    }) {
      ...NoteFragment
    }
  }
  ${NOTE_FRAGMENT}
`

const CREATE_NOTE_MUTATION = gql`
  mutation createNote($userId: ID, $text: String!) {
    createNote(userId: $userId, text: $text) {
      ...NoteFragment
    }
  }
  ${NOTE_FRAGMENT}
`

export {
  NOTES_BY_USER_QUERY,
  CREATE_NOTE_MUTATION,
}
