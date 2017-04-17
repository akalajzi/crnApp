import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import update from 'immutability-helper';
import Swipeable from 'react-native-swipeable'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import {
  NOTES_BY_USER_QUERY,
  CREATE_NOTE_MUTATION,
  DELETE_NOTE_MUTATION,
} from '../../graphql/notes.graphql'
import { Container, Loader } from '../../components'

import { SwipeLeftContent } from './SwipeElements.react'
import NoteListItem from './NoteListItem.react'
import NotesEmpty from './NotesEmpty.react'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
    // paddingTop: 5,
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
  isSwiping: false,
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
  deleteNote: PropTypes.func,
}

class NoteList extends Component {
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

  render() {
    const { loading, notes } = this.props

    if (loading) {
      return <Loader />
    }

    if (notes.length === 0) {
      return <NotesEmpty />
    }

    return(
      <KeyboardAvoidingView
        behavior={'position'}
        contentContainerStyle={styles.container}
        style={styles.container}>
        <ListView
          ref={(ref) => { this.listView = ref }}
          scrollEnabled={!this.state.isSwiping}
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
            <Swipeable
              onSwipeStart={() => this.setState({isSwiping: true})}
              onSwipeRelease={() =>this.setState({isSwiping: false})}
              leftContent={<SwipeLeftContent active={this.state.leftActionActivated} />}
              leftActionActivationDistance={155}
              onLeftActionActivate={() => this.setState({leftActionActivated: true})}
              onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
              onLeftActionRelease={() => this.props.deleteNote({id: note.id})}
            >
              <NoteListItem {...note} />
            </Swipeable>
          )}
        />
      </KeyboardAvoidingView>
    )
  }
}

NoteList.defaultProps = defaultProps
NoteList.propTypes = propTypes

const userNotesQuery = graphql(NOTES_BY_USER_QUERY, {
  options: ({ id }) => ({ variables: { userId: USER_ID } }),
  props: ({ data: { loading, allNotes } }) => ({
    loading, notes: allNotes
  }),
})

const deleteNote = graphql(DELETE_NOTE_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    deleteNote: ({ id }) =>
      mutate({
        variables: { id },
        updateQueries: {
          Notes: (previousResult, {mutationResult}) => {
            const deletedNote = mutationResult.data.deleteNote
            return update(previousResult, {
              allNotes: {
                $set: previousResult.allNotes
                  .filter(note => deletedNote.id !== note.id)
              }
            })
          }
        }
      })
  })
})


export default compose(
  userNotesQuery,
  deleteNote,
)(NoteList)
