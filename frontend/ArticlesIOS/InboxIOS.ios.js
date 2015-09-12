
'use strict';

var React = require('react-native');
var {
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
      content = <ThreadsListIOS threads={this.state.threads} />;
    } else {
      if (this.state.badResponseStatus !== null) {
        content =
          <Text style={styles.loading}>
            Server responded with {this.state.badResponseStatus}
          </Text>;
      } else {
        content =
          <Text style={styles.loading}>
            Loading
          </Text>;
      }
    }

    return (
      <View>
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
  loading: {
    color: '#333333',
  },
});

module.exports = InboxIOS;
