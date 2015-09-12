
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
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
    return (
      <View style={styles.inbox}>
        {this.renderCompose()}
        {this.renderThreads()}
      </View>
    );
  }

  renderThreads(): Component {
    if (this.state.threads.length === 0) {
      if (this.state.badResponseStatus !== null) {
        return (
          <View style={[styles.main, styles.cta]}>
            <Text>Server responded with {this.state.badResponseStatus}</Text>
          </View>
        );
      }
      return (
        <View style={[styles.main, styles.cta]}>
          <ActivityIndicatorIOS animating={true} />
        </View>
      );
    }
    return (
      <ThreadsListIOS
        style={styles.main}
        threads={this.state.threads}
      />
    );
  }

  renderCompose(): Component {
    return (
      <TouchableHighlight onPress={this.createThread}>
        <Text style={styles.compose}>new</Text>
      </TouchableHighlight>
    );
  }

  createThread = async () => {
    console.log('make new thread');
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
