import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import { StyleSheet, Text, View } from 'react-native'
import {
  // Card,
  ListItem,
} from 'react-native-material-ui'
import {
  // ListItem,
  Divider,
  FlatButton,
} from 'carbon-ui'

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  rightText: {
    fontSize: 10,
  }
})

export default class NoteListItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }

  handleItemPress() {
    console.log('pressed item');
  }

  render() {
    const { text, updatedAt } = this.props
    const updated = moment(updatedAt).fromNow()

    return(
      <View>
        <ListItem
          dense
          leftElement={'create'}
          centerElement={{
            primaryText: text,
          }}
          rightElement={
            <Text style={styles.rightText}>{updated}</Text>
          }
          onPress={this.handleItemPress.bind(this)}
        />
        <Divider />
      </View>
    )
  }
}
