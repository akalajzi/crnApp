import React, {Component} from 'react';

import { BottomNavigation } from 'react-native-material-ui'
import routes from '../routes'
import { navigateTo } from '../helpers/common.js'

class BottomMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'home',
    }
  }

  navigateTo(page) {
    this.setState({ active: page })
    const navigator = this.props.navigator

    navigateTo(navigator, page)
  }

  render() {
    return (
      <BottomNavigation
        active={this.state.active}
        hidden={false}
        style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0}}}
        >
        <BottomNavigation.Action
          key="today"
          icon="today"
          label="Today"
          onPress={() => this.navigateTo('today')}
        />
        <BottomNavigation.Action
          key="home"
          icon="home"
          label="Home"
          onPress={() => this.navigateTo('home')}
        />
        <BottomNavigation.Action
          key="people"
          icon="people"
          label="People"
          onPress={() => this.navigateTo('newnote')}
        />
        <BottomNavigation.Action
          key="notes"
          icon="whatshot"
          label="Notes"
          onPress={() => this.navigateTo('notes')}
        />
      </BottomNavigation>
    );
  }
}

export default BottomMenu
