import React, { Component } from 'react'

import { StyleSheet, View, Text } from 'react-native'
import { Toolbar, Button } from 'react-native-material-ui'

import { Container } from '../components'

// const styles = StyleSheet.create({
//
// })

export default class NotesNewScene extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //
    // }
  }

  handleSave() {
    console.log('saving...');
  }

  render() {
    const { route, navigator } = this.props
    const sceneTitle = `${route.title}`

    return (
      <Container>
        <Toolbar
          key='toolbar'
          leftElement='clear'
          onLeftElementPress={() => navigator.pop()}
          centerElement={sceneTitle}
          rightElement={
            <Button text="Save" style={{ text: {color: '#fff'}}}/>
          }
          onRightElementPress={this.handleSave.bind(this)}
          />
        <View style={{flex: 1}}>
          <Text>Write something</Text>
        </View>
      </Container>
    );
  }
}
