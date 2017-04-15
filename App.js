import React, { Component } from 'react';
import { Navigator, NativeModules, StatusBar, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import { Blank, Container } from './src/components'
import routes from './src/routes'
import api from './src/config/api'

const UIManager = NativeModules.UIManager;

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
    accentColor: COLOR.pink500,
  },
};

console.log(api);

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
  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  static renderScene(route, navigator) {
    return (
      <Container>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={{ backgroundColor: COLOR.green500, height: 24 }} />
        <route.Page
          route={route}
          navigator={navigator}
          />
      </Container>
    );
  }

  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider uiTheme={uiTheme}>
          <Navigator
            configureScene={App.configureScene}
            initialRoute={routes.home}
            ref={this.onNavigatorRef}
            renderScene={App.renderScene}
          />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
