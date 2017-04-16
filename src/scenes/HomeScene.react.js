import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo'

import { Platform, StyleSheet, View, ToastAndroid } from 'react-native'
import { Container } from '../components'
import { Toolbar, ActionButton } from 'react-native-material-ui'

import Notes from '../containers/Notes/Notes.react'

import { USER_QUERY } from '../graphql/user.graphql'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

const defaultProps = {
  User: {
    name: 'you',
    notes: [],
  }
}

class HomeScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      selected: [],
      bottomHidden: false,
    }
  }

  render() {
    const { route, navigator, User } = this.props
    const sceneTitle = `${route.title} ${User.name}`

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

HomeScene.defaultProps = defaultProps

const userQuery = graphql(USER_QUERY, {
  options: ({ id }) => ({ variables: { id: USER_ID } }),
  props: ({ data: { loading, User } }) => ({
    loading, User,
  }),
})

export default compose(
  userQuery,
)(HomeScene)
