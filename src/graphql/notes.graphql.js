import gql from 'graphql-tag';

const NOTE_FRAGMENT = gql`
  fragment NoteFragment on Note {
    id
    createdAt
    updatedAt
    title
    text
    reminder
    colorLabel
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
  mutation createNote($userId: ID, $text: String, $title: String, $reminder: DateTime, $colorLabel: String) {
    createNote(userId: $userId, text: $text, title: $title, reminder: $reminder, colorLabel: $colorLabel) {
      ...NoteFragment
    }
  }
  ${NOTE_FRAGMENT}
`

const DELETE_NOTE_MUTATION = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`

export {
  NOTES_BY_USER_QUERY,
  CREATE_NOTE_MUTATION,
  DELETE_NOTE_MUTATION,
}
