import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';

import { Platform, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { Container } from '../../components'
import { Toolbar, Card, ActionButton, BottomNavigation } from 'react-native-material-ui';

import { USER_QUERY } from '../../graphql/user'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      selected: [],
      bottomHidden: false,
    }
  }

  handleCardPress() {
    console.log("card pressed");
  }

  render() {
    return (
      <Container>
        <Toolbar
          key='toolbar'
          leftElement='menu'
          onLeftElementPress={() => this.props.navigator.pop()}
          centerElement={this.props.route.title}
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: value => this.setState({ searchText: value }),
            onSearchClosed: () => this.setState({ searchText: '' }),
          }}
          />
        <View style={{flex: 1}}>
          <Text>
            Alooooo { this.props.User && this.props.User.name }
          </Text>
          <Card>
            <Text onPress={this.handleCardPress.bind(this)}>This is card</Text>
          </Card>
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

const userQuery = graphql(USER_QUERY, {
  options: ({ id }) => ({ variables: { id: USER_ID } }),
  props: ({ data: { loading, User } }) => ({
    loading, User,
  }),
})

export default compose(
  userQuery,
)(Home)
