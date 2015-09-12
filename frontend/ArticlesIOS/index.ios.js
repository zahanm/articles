
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} = React;

var ThreadsListIOS = require('./ThreadsListIOS.ios');

class ArticlesIOS extends Component {

  render(): Component {
    return (
      <View style={styles.container}>
        <ThreadsListIOS />
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
