import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { NOTES_BY_USER_QUERY } from '../../graphql/notes.graphql'

import { StyleSheet, Text, View } from 'react-native'
import { Container } from '../../components'
import { TextField } from 'carbon-ui'

import NoteCard from '../../components/Cards/NoteCard.react'
import NotesEmpty from './NotesEmpty.react'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

const styles = StyleSheet.create({
  newNote: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
})

const defaultProps = {
  notes: [],
  loading: false,
}

const defaultState = {
  note: {
    textField: '',
    errors: {},
  },
}

class Notes extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState
  }

  componentWillReceiveProps(nextProps) {
    console.log('notes nextProps', nextProps);
  }

  setNoteText = (val) => {
    this.setState({
      note: { ...this.state.note, 'textField': val }
    })
  }

  render() {
    const { notes } = this.props

    return(
      <Container>
        <View style={styles.newNote}>
          <TextField
            placeholder="New note..."
            value={this.state.note.textField}
            onChangeText={val => this.setNoteText(val)}
          />
        </View>
        <View>
          {
            notes.length > 0
            ? notes.map((note, index) => {
              return <NoteCard key={index} props={note} />
            })
            : <NotesEmpty />
          }
        </View>
      </Container>
    )
  }
}

Notes.defaultProps = defaultProps

const userNotesQuery = graphql(NOTES_BY_USER_QUERY, {
  options: ({ id }) => ({ variables: { userId: USER_ID } }),
  props: ({ data: { loading, allNotes } }) => ({
    loading, notes: allNotes
  }),
})

export default compose(
  userNotesQuery
)(Notes)
