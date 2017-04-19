import React, {Component} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet, View } from 'react-native'
import { Container } from '../components'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

class ChatScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      }
    })
  }

  render() {
    const { route, navigator } = this.props

    return (
      <Container>
        <View style={{flex: 1, marginBottom: 60}}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend.bind(this)}
            user={{ _id: 1 }}
          />
        </View>
      </Container>
    );
  }
}

// ChatScene.defaultProps = defaultProps

export default ChatScene
