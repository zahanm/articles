
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

const InboxIOS = require('./InboxIOS.ios');

class ArticlesIOS extends Component {

  _renderScene = (route: object, navigator: Navigator) => {
    return (
      <InboxIOS style={styles.container} />
    );
  }

  render(): Component {
    return (
      <Navigator
        initialRoute={{name: 'Inbox'}}
        renderScene={this._renderScene}
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ArticlesIOS', () => ArticlesIOS);
