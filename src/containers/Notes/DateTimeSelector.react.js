import React, { Component } from 'react';
import moment from 'moment'
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TextField } from 'react-native-material-textfield'
import { Button, IconToggle, ListItem } from 'react-native-material-ui'

export default class DateTimeSelector extends Component {
  state = {
    isDateTimePickerVisible: false,
    selected: this.props.defaultDateTime
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _clearDateTime = () => {
    this.setState({ selected: null })
    this.props.onDateTimeSelect(null)
  }

  _handleDatePicked = (date) => {
    const dateString = date.toISOString()
    this.setState({
      isDateTimePickerVisible: false,
      selected: dateString,
    })
    this.props.onDateTimeSelect(dateString)
  };

  render () {
    const selected = this.state.selected
    const selectedString = selected ? moment(selected).calendar() : ''

    return (
      <View>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          {
            selected
            ? (<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <IconToggle name='clear' size={30} onPress={this._clearDateTime} />
              <View style={{overflow: 'hidden', flex: 2}}>
                <TextField
                  label='Reminder'
                  disabled
                  value={selectedString}
                  style={{width: '100%'}}
                />
              </View>
            </View>)
            : <Button primary text="Set reminder" icon="schedule" onPress={this._showDateTimePicker} />
            // : <TextField label='Reminder' disabled value={selectedString} />
          }
        </TouchableOpacity>
        <DateTimePicker
          mode='datetime'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }

}
