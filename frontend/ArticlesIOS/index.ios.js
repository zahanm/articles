
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
const ServerResponse = require('./ServerResponse.js');

class ArticlesIOS extends Component {

  _renderScene = (route: object, navigator: Navigator) => {
    console.log(route);
    let content = null;
    switch (route.id) {
      case 'inbox':
        content = <Inbox nav={navigator} {...route} />;
        break;
      case 'response':
        content = <ServerResponse nav={navigator} {...route} />;
        break;
      case 'compose':
        content = <Compose nav={navigator} {...route} />;
        break;
      default:
        throw new Error('no scene given');
    }
    return (
      <View style={[styles.fill, styles.offsetFromTop]}>
        {content}
      </View>
    );
  }

  _navBarRoutes = {
    LeftButton: (route, navigator, index, navState) => {
      if (index < 1) {
        // first scene
        return null;
      }
      var previousRoute = navState.routeStack[index - 1];
      return (
        <TouchableOpacity onPress={() => navigator.pop()} >
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ marginVertical: 10 }}>
              {previousRoute.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },

    RightButton: function(route, navigator, index, navState) {
      // don't want one
      return null;
    },

    Title: function(route, navigator, index, navState) {
      return (
        <Text style={{ fontWeight: '500', marginVertical: 10 }}>
          {route.title}
        </Text>
      );
    },
  }

  render(): Component {
    return (
      <Navigator
        initialRoute={{ id: 'inbox', title: 'Inbox' }}
        renderScene={this._renderScene}
        navigationBar={
          <Navigator.NavigationBar routeMapper={this._navBarRoutes} />
        }
        configureScene={(route) => Navigator.SceneConfigs.HorizontalSwipeJump}
      />
    );
  }

}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  offsetFromTop: {
    marginTop: 64, // nav bar height
  },
});

AppRegistry.registerComponent('ArticlesIOS', () => ArticlesIOS);
