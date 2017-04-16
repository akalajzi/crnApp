import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import update from 'immutability-helper';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { NOTES_BY_USER_QUERY, CREATE_NOTE_MUTATION } from '../../graphql/notes.graphql'
import { Container } from '../../components'
import { TextField, IconToggle } from 'carbon-ui'

import NoteCard from '../../components/Cards/NoteCard.react'
import NotesEmpty from './NotesEmpty.react'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

const styles = StyleSheet.create({
  newNote: {
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
  },
  loading: {
    justifyContent: 'center',
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
  ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  shouldScrollToBottom: false,
}

const propTypes = {
  loading: PropTypes.bool.isRequired,
  notes: PropTypes.array.isRequired,
}

class Notes extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState
  }

  componentWillReceiveProps(nextProps) {
    const oldData = this.props
    const newData = nextProps

    if (!!newData.notes && (newData.notes !== oldData.notes)) {
      this.setState({
        ds: this.state.ds.cloneWithRows(newData.notes.slice().reverse())
      })
    }
  }

  setNoteText = (val) => {
    this.setState({
      note: { ...this.state.note, 'textField': val }
    })
  }

  handleAddNote() {
    // dont do anything if its empty
    if (this.state.note.textField.length === 0) { return }
    this.props.createNote({
      userId: USER_ID,
      text: this.state.note.textField,
    })
    // reset field
    this.setState({
      note: defaultState.note,
      shouldScrollToBottom: true,
    })
  }

  render() {
    const { loading, notes } = this.props

    if (loading) {
      return(
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      )
    }

    return(
      <KeyboardAvoidingView
        behavior={'position'}
        contentContainerStyle={styles.container}
        style={styles.container}>
        <ListView
          ref={(ref) => { this.listView = ref }}
          style={styles.listView}
          enableEmptySections
          dataSource={this.state.ds}
          onContentSizeChange={() => {
            if (this.state.shouldScrollToBottom) {
              this.listView.scrollToEnd({animated: true})
              this.setState({shouldScrollToBottom: false})
            }
          }}
          renderRow={(note) => (
            <NoteCard props={note} />
          )}
        />
        <View style={styles.newNote}>
          <TextField
            placeholder="New note..."
            value={this.state.note.textField}
            onChangeText={val => this.setNoteText(val)}
          />
          <IconToggle name="add" onPress={this.handleAddNote.bind(this)} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

Notes.defaultProps = defaultProps
Notes.propTypes = propTypes

const userNotesQuery = graphql(NOTES_BY_USER_QUERY, {
  options: ({ id }) => ({ variables: { userId: USER_ID } }),
  props: ({ data: { loading, allNotes } }) => ({
    loading, notes: allNotes
  }),
})

const createNote = graphql(CREATE_NOTE_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createNote: ({ text, userId }) =>
      mutate({
        variables: { text, userId },
        optimisticResponse: {
          __typename: 'Mutation',
          createNote: {
            __typename: 'Note',
            id: null,
            text,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        },
        updateQueries: {
          Notes: (previousResult, { mutationResult }) => {
            console.log('previousResult ', previousResult);
            console.log('mutationResult ', mutationResult);
            const newNote = mutationResult.data.createNote
            return update(previousResult, {
              allNotes: {
                $unshift: [newNote]
              }
            })
          }
        }
      })
  })
})


export default compose(
  userNotesQuery,
  createNote,
)(Notes)
