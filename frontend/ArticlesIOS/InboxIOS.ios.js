
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  View,
} = React;

var APIConst = require('./APIConst');
var ThreadsListIOS = require('./ThreadsListIOS.ios');

/**
 * Fetches and shows all threads you are a participant in
 */
class InboxIOS extends Component {

  state = {
    threads: [],
    badResponseStatus: null,
  }

  render(): Component {
    let content = null;
    if (this.state.threads.length > 0) {
      content =
        <ThreadsListIOS
          style={styles.main}
          threads={this.state.threads}
        />;
    } else {
      if (this.state.badResponseStatus !== null) {
        content =
          <View style={[styles.main, styles.cta]}>
            <Text>Server responded with {this.state.badResponseStatus}</Text>
          </View>;
      } else {
        content =
          <View style={[styles.main, styles.cta]}>
            <ActivityIndicatorIOS animating={true} />
          </View>;
      }
    }

    return (
      <View style={styles.inbox}>
        <Text style={styles.compose}>new</Text>
        {content}
      </View>
    );
  }

  async componentDidMount(): Promise<void> {
    let response =
      await fetch(`${APIConst.ENDPOINT}/threads`, { headers: APIConst.auth() });
    if (!response.ok) {
      this.setState({ badResponseStatus: response.status });
      return;
    }
    let threads = await response.json();
    this.setState({ threads });
  }

}

var styles = StyleSheet.create({
  inbox: {
    flex: 1,
  },
  compose: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 5,
  },
  main: {
    flex: 1,
  },
  cta: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = InboxIOS;
