import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from '../../components'
import { Toolbar } from 'react-native-material-ui';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      selected: [],
      active: null,
    }
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
        <Text>Alooooo</Text>
      </Container>
    );
  }
}
