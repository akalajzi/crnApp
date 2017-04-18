import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import update from 'immutability-helper';
import {
  CREATE_NOTE_MUTATION,
} from '../graphql/notes.graphql'

import { StyleSheet, View, Text } from 'react-native'
import { Toolbar, Button } from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'
import { Colors } from 'carbon-ui'

import { Container } from '../components'
import ColorSelector from '../containers/Notes/ColorSelector.react'
import DateTimeSelector from '../containers/Notes/DateTimeSelector.react'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 10,
  }
})

const colors = [
  Colors.grey600,
  Colors.red500,
  Colors.indigo500,
  Colors.blue500,
  Colors.green700,
  Colors.amber500,
]

class NotesNewScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      reminder: null,
      colorLabel: Colors.grey600,
    }
  }

  handleSave() {
    if (this.state.title.length === 0 && this.state.text.length === 0) {
      // nothing to save
      this.props.navigator.pop()
      return
    }
    console.log('saving...', this.state);
    this.props.createNote({
      userId: USER_ID,
      text: this.state.text,
      title: this.state.title,
      reminder: this.state.reminder,
      colorLabel: this.state.colorLabel,
    })
    this.props.navigator.pop()
  }

  handleColorSelect(color) {
    this.setState({colorLabel: color})
  }

  handleDateTimeSelect(datetime){
    this.setState({reminder: datetime})
  }

  render() {
    const { route, navigator } = this.props
    const sceneTitle = `${route.title}`

    return (
      <Container>
        <Toolbar
          key='toolbar'
          leftElement='clear'
          onLeftElementPress={() => navigator.pop()}
          centerElement={sceneTitle}
          rightElement={
            <Button
              text="Save"
              style={{ text: {color: '#fff'}}}
              onPress={this.handleSave.bind(this)}
            />
          }
          onRightElementPress={this.handleSave.bind(this)}
          />
        <View style={styles.viewContainer}>
          <TextField
            label='Title'
            value={this.state.title}
            onChangeText={val => this.setState({title: val})}
          />
          <TextField
            label='Note'
            multiline
            value={this.state.text}
            onChangeText={val => this.setState({text: val})}
          />
          <DateTimeSelector
            defaultDateTime={this.state.reminder}
            onDateTimeSelect={this.handleDateTimeSelect.bind(this)}
          />
          <ColorSelector
            defaultColor='grey'
            onColorSelect={this.handleColorSelect.bind(this)}
          />
        </View>
      </Container>
    );
  }
}

const createNote = graphql(CREATE_NOTE_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createNote: ({ userId, text, title, reminder, colorLabel }) =>
      mutate({
        variables: { userId, text, title, reminder, colorLabel },
        optimisticResponse: {
          __typename: 'Mutation',
          createNote: {
            __typename: 'Note',
            id: null,
            text,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title,
            reminder,
            colorLabel,
          }
        },
        updateQueries: {
          Notes: (previousResult, { mutationResult }) => {
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
  createNote,
)(NotesNewScene)
