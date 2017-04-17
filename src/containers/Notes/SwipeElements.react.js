import React from 'react'
import {StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-material-ui'

const styles = StyleSheet.create({
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  itemContent: {
    color: '#fff'
  }
})

export const SwipeLeftContent = ({active}) => {
  return(
    <View style={[styles.leftSwipeItem, {
      backgroundColor: active ? 'red' : 'grey' }
    ]}>
      {
        active
        ? <Icon name="clear" color='#fff' />
        : <Text style={styles.itemContent}>keep pulling...</Text>
      }
    </View>
  )
}
