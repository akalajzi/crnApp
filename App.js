import React, { Component } from 'react';
import { Navigator, NativeModules, StatusBar, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Font } from 'expo'
import _ from 'lodash'

import { Container, Loader } from './src/components'
import BottomMenu from './src/containers/BottomMenu.react'
import routes from './src/routes'
import api from './src/config/api'

import {LoginScene} from './src/scenes'

const UIManager = NativeModules.UIManager;

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
    accentColor: COLOR.pink500,
  },
}

const networkInterface = createNetworkInterface({ uri: api.graphcool.simple })

const client = new ApolloClient({
  networkInterface,
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {}, // initial state
  composeWithDevTools(
    applyMiddleware(client.middleware()),
  ),
);

export default class App extends Component {
  state = { fontsLoaded: false }

  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  static renderScene(route, navigator) {
    return(
      <Container>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={{ backgroundColor: COLOR.green500, height: 24 }} />
        <route.Page
          route={route}
          navigator={navigator}
        />
      </Container>
    )
  }

  async componentDidMount() {
    await Font.loadAsync({
      'MaterialIcons-Regular': require('./assets/fonts/MaterialIcons-Regular.ttf'),
      'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
      'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
      'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      'Roboto-LightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
      'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
    })

    this.setState({ fontsLoaded: true })
  }


  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    console.log('store -> ', store.getState());
    return (
      <ApolloProvider store={store} client={client}>
        { _.isEmpty(store.getState().apollo.data)
          ? <LoginScene />
          : <ThemeProvider uiTheme={uiTheme}>
          { this.state.fontsLoaded
            ? <Navigator
              configureScene={App.configureScene}
              initialRoute={routes.home}
              ref={this.onNavigatorRef}
              renderScene={App.renderScene}
              navigationBar={<BottomMenu />}
            />
            : <Loader />
          }
        </ThemeProvider>
      }
      </ApolloProvider>
    );
  }
}
