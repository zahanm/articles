
'use strict';

const React = require('react-native');
const {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

const Compose = require('./Compose.js');
const Inbox = require('./Inbox.js');
const Thread = require('./Thread.js');
const ServerResponse = require('./ServerResponse.js');

class ArticlesIOS extends Component {

  render(): Component {
    return (
      <Navigator
        initialRoute={{ id: 'inbox', title: 'Inbox' }}
        renderScene={this._renderScene}
        ref="nav"
        navigationBar={
          <Navigator.NavigationBar routeMapper={this._navBarRoutes} />
        }
        configureScene={(route) => Navigator.SceneConfigs.HorizontalSwipeJump}
        sceneStyle={[styles.fill, styles.offsetFromTop]}
      />
    );
  }

  _renderScene = (route: object, navigator: Navigator) => {
    switch (route.id) {
      case 'inbox':
        return <Inbox nav={navigator} {...route} />;
      case 'response':
        return <ServerResponse nav={navigator} {...route} />;
      case 'compose':
        return <Compose nav={navigator} {...route} />;
      case 'thread':
        return <Thread nav={navigator} {...route} />;
      default:
        throw new Error('no scene given');
    }
  }

  _navBarRoutes = {
    LeftButton: (route, navigator, index, navState) => {
      if (index < 1) {
        // first scene
        return null;
      }
      const previous = navState.routeStack[index - 1];
      return (
        <TouchableOpacity onPress={() => navigator.pop()} >
          <Text style={[styles.vert10, { paddingLeft: 10 }]}>
            {previous.title}
          </Text>
        </TouchableOpacity>
      );
    },

    RightButton: (route, navigator, index, navState) => {
      const composeButton =
        <TouchableOpacity
          style={[styles.vert10, { paddingRight: 10 }]}
          onPress={this._compose}
        >
          <Text>new</Text>
        </TouchableOpacity>;
      switch (route.id) {
        case 'inbox': return composeButton;
      }
      return null;
    },

    Title: (route, navigator, index, navState) => {
      return (
        <Text style={[styles.vert10, { fontWeight: '500' }]}>
          {route.title}
        </Text>
      );
    },
  }

  _compose = () => {
    // this.refs.nav.push({ id: 'thread', title: 'Articles', threadID: '55ef0f2ffc4a30c27d2242d5' });
    this.refs.nav.push({ id: 'compose', title: 'Compose' });
  }

}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  offsetFromTop: {
    marginTop: 64, // nav bar height
  },
  vert10: {
    paddingVertical: 10,
  },
});

AppRegistry.registerComponent('ArticlesIOS', () => ArticlesIOS);
