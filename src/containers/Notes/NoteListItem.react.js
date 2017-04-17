import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import { StyleSheet, Text, View } from 'react-native'
import {
  ListItem,
  Icon,
} from 'react-native-material-ui'
import {
  Divider,
  FlatButton,
  Colors,
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
    text: PropTypes.string,
    title: PropTypes.string,
    colorLabel: PropTypes.string,
    reminder: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }

  handleItemPress() {
    console.log('pressed item');
  }

  render() {
    const { text, title, reminder, colorLabel, updatedAt } = this.props
    const updated = moment(updatedAt).fromNow()
    const primary = title || text
    const secondary = text.length ? text : null

    const iconColor = colorLabel || Colors.grey600

    return(
      <View>
        <ListItem
          dense
          leftElement={<Icon name='create' color={iconColor} />}
          centerElement={{
            primaryText: primary,
            secondaryText: secondary,
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
