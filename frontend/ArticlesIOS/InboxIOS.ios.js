
'use strict';

const React = require('react-native');
const {
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

const APIConst = require('./APIConst');
const ThreadsListIOS = require('./ThreadsListIOS.ios');

/**
 * Fetches and shows all threads you are a participant in
 */
class InboxIOS extends Component {

  state = {
    threads: [],
    serverResponseStatus: null,
    groupname: '',
  }

  render(): Component {
    return (
      <View style={styles.inbox}>
        {this.renderCompose()}
        {this.renderThreads()}
      </View>
    );
  }

  renderCompose(): Component {
    return (
      <View style={styles.compose}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Group Name"
          onChangeText={(groupname) => this.setState({ groupname })}
          value={this.state.groupname}
        />
        <TouchableHighlight onPress={this.createThread}>
          <Text>new</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderThreads(): Component {
    if (this.state.serverResponseStatus !== null) {
      // early exit to show server status
      return (
        <View style={[styles.main, styles.cta]}>
          <Text>Server responded with {this.state.serverResponseStatus}</Text>
        </View>
      );
    }
    if (this.state.threads.length === 0) {
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

  createThread = async () => {
    const name = this.state.groupname;
    const headers = APIConst.authenticatedHeaders();
    headers.set('Content-Type', 'application/json');
    const response = await fetch(`${APIConst.ENDPOINT}/thread`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      this.setState({ serverResponseStatus: response.status });
      return;
    }
    this.setState({ serverResponseStatus: response.status });
  }

  async componentDidMount(): Promise<void> {
    const response = await fetch(`${APIConst.ENDPOINT}/threads`, {
      headers: APIConst.authenticatedHeaders(),
    });
    if (!response.ok) {
      this.setState({ serverResponseStatus: response.status });
      return;
    }
    let threads = await response.json();
    this.setState({ threads });
  }

}

const styles = StyleSheet.create({
  inbox: {
    flex: 1,
  },
  compose: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
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
