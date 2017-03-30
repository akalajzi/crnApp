import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Blank extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is BLANK</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
