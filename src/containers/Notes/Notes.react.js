import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { NOTES_BY_USER_QUERY } from '../../graphql/notes.graphql'

import { StyleSheet, Text, View } from 'react-native'
import { Container } from '../../components'
// import { TextField } from 'carbon-ui'

import NoteCard from '../../components/Cards/NoteCard.react'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"


const defaultProps = {
  notes: [],
  loading: false,
}

class Notes extends Component {

  componentWillReceiveProps(nextProps) {
    console.log('notes nextProps', nextProps);
  }

  render() {
    const { notes } = this.props

    return(
      <Container>
        <View>
          <Text>New note</Text>
        </View>
        <View>
          {
            notes.length > 0
            ? notes.map((note, index) => {
              return <NoteCard key={index} props={note} />
            })
            : <Text>No notes. Add some...</Text>
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
