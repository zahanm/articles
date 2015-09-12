
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} = React;

var InboxIOS = require('./InboxIOS.ios');

class ArticlesIOS extends Component {

  render(): Component {
    return (
      <View style={styles.container}>
        <InboxIOS />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ArticlesIOS', () => ArticlesIOS);
