
'use strict';

const React = require('react-native');
const {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} = React;

const InboxIOS = require('./InboxIOS.ios');

class ArticlesIOS extends Component {

  render(): Component {
    return (
      <View style={styles.container}>
        <InboxIOS />
      </View>
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
