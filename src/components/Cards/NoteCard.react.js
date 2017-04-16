import React from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { Card, ListItem } from 'react-native-material-ui'

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
})

export default function NoteCard({props}) {
  return (
    <View>
      <Card>
        <ListItem
          centerElement={<Text>{ props.createdAt }</Text>}
        />
        <View style={styles.textContainer} >
          <Text>
            { props.text }
          </Text>
        </View>
      </Card>
    </View>
  )
}
