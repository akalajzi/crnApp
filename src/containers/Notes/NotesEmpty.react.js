import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function NotesEmpty() {
  const styles = StyleSheet.create({
     contentPadding: {
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
  })

  return(
    <View style={styles.contentPadding}>
      <Text>No notes. Add some.</Text>
    </View>
  )
}
