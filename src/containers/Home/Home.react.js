import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';

import { StyleSheet, Text, View } from 'react-native';
import { Container } from '../../components'
import { Toolbar } from 'react-native-material-ui';

import { USER_QUERY } from '../../graphql/user'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      selected: [],
      active: null,
    }
  }

  componentWillUpdate(nextProps) {
    console.log('home got new props: ', nextProps);
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
        <Text>
          Alooooo { this.props.User && this.props.User.name }
        </Text>
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
