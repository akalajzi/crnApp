import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import { StyleSheet, Text, View } from 'react-native'
import {
  Card,
  // ListItem
} from 'react-native-material-ui'
import {
  ListItem,
  Divider,
  FlatButton,
} from 'carbon-ui'

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
})

export default class NoteCard extends Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    actions: PropTypes.shape({
      deleteNote: PropTypes.func,
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

  toggleItem() {
    const oldState = {...this.state}
    this.setState({ expanded: !oldState.expanded})
  }

  handleDelete() {
    console.log('delete ', this.props.id);
    this.props.actions.deleteNote({id: this.props.id})
  }

  render() {
    const { text, updatedAt } = this.props
    const updated = moment(updatedAt).fromNow()

    return(
      <View>
        <Card>
          <ListItem
            primaryText={text}
            secondaryText={updated}
            expanded={this.state.expanded}
            onPress={this.toggleItem.bind(this)}
          >
            <View style={styles.textContainer}>
              <Text>{text}</Text>
              <Divider />
              <FlatButton
                onPress={this.handleDelete.bind(this)}
              >Delete</FlatButton>
            </View>
          </ListItem>
        </Card>
      </View>
    )
  }
}
