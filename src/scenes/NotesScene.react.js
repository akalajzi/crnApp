import React, { Component } from 'react'

import { Platform, StyleSheet, View, ToastAndroid } from 'react-native'
import { Toolbar, ActionButton } from 'react-native-material-ui'

import { Notes } from '../containers'
import { Container } from '../components'

export default class NotesScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      selected: [],
      bottomHidden: false,
    }
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
          <Notes />

          <ActionButton
            actions={[
              { icon: 'create', label: 'Note' },
              { icon: 'assignment', label: 'Task' },
              { icon: 'schedule', label: 'Reminder' },
              { icon: 'favorite', label: 'Wish' },
            ]}
            hidden={this.state.bottomHidden}
            icon="add"
            transition="speedDial"
            onPress={(action) => {
              if (Platform.OS === 'android') {
                ToastAndroid.show(action, ToastAndroid.SHORT);
              }
            }}
            style={{
              positionContainer: {bottom: 76},
            }}
          />
        </View>
      </Container>
    );
  }
}
