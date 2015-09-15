
'use strict';

const React = require('react-native');
const {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  View,
} = React;

const Compose = require('./Compose.js');
const InboxIOS = require('./InboxIOS.ios');
const ServerResponse = require('./ServerResponse.js');

class ArticlesIOS extends Component {

  _renderScene = (route: object, navigator: Navigator) => {
    switch (route.id) {
      case 'inbox':
        return <InboxIOS nav={navigator} {...route} />;
      case 'response':
        return <ServerResponse nav={navigator} {...route} />;
      case 'compose':
        return <Compose nav={navigator} {...route} />;
      default:
        throw new Error('no scene given');
    }
  }

  render(): Component {
    return (
      <Navigator
        initialRoute={{id: 'inbox'}}
        renderScene={this._renderScene}
      />
    );
  }

}

AppRegistry.registerComponent('ArticlesIOS', () => ArticlesIOS);
