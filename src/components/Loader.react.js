import React from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
  },
  loading: {
    justifyContent: 'center',
  },
})

export default function Loader() {
  return(
    <View style={[styles.loading, styles.container]}>
      <ActivityIndicator />
    </View>
  )
}
