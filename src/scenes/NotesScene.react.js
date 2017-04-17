import React, { Component } from 'react'

import { Platform, StyleSheet, View, ToastAndroid } from 'react-native'
import { Toolbar, ActionButton } from 'react-native-material-ui'

import {
  NoteList,
  NotesActionButton
} from '../containers'
import { Container } from '../components'
import {navigateTo} from '../helpers/common.js'

const styles = StyleSheet.create({

})

export default class NotesScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      selected: [],
      bottomHidden: false,
    }
  }

  handleABPress() {
    // open new note creator
    navigateTo(this.props.navigator, 'notesNew')
  }

  render() {
    const { route, navigator } = this.props
    const sceneTitle = `${route.title}`

    return (
      <Container>
        <Toolbar
          key='toolbar'
          leftElement='menu'
          onLeftElementPress={() => navigator.pop()}
          centerElement={sceneTitle}
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: value => this.setState({ searchText: value }),
            onSearchClosed: () => this.setState({ searchText: '' }),
          }}
          />
        <View style={{flex: 1}}>
          <NoteList />
          <ActionButton
            style={{
              positionContainer: {bottom: 76},
            }}
            hidden={this.state.bottomHidden}
            icon="add"
            onPress={this.handleABPress.bind(this)}
          />
        </View>
      </Container>
    );
  }
}
