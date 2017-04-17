import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { RadioButton } from 'react-native-material-ui'
import { Colors } from 'carbon-ui'

const styles = StyleSheet.create({
  //
})

const selection = [
  { key: 'grey', color: Colors.grey600 },
  { key: 'red', color: Colors.red500 },
  { key: 'indigo', color: Colors.indigo500 },
  { key: 'blue', color: Colors.blue500 },
  { key: 'green', color: Colors.green700 },
  { key: 'amber', color: Colors.amber500 },
]

class ColorSelector extends Component {
  static propTypes = {
    defaultColor: PropTypes.string.isRequired,
    onColorSelect: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: this.props.defaultColor,
    }
  }

  renderRadioSelectors() {
    return selection.map((item) => {
      return (
        <RadioButton
          key={item.key}
          checked={this.state.selected === item.key}
          style={{
            label: { color: item.color },
            icon: { color: item.color },
          }}
          value={item.key}
          onCheck={(checked) => {
            if (this.state.checked === item.key) {
              this.setState({ selected: null })
            } else {
              this.setState({ selected: item.key })}
              this.props.onColorSelect(item.color)
            }
          }
        />
      )
    })
  }

  render() {
    return(
      <View style={{ flexDirection: 'row'}}>
        { this.renderRadioSelectors() }
      </View>
    )
  }
}

export default ColorSelector
