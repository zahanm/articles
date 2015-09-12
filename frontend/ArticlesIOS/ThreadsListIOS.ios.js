
'use strict';

var React = require('react-native');
var {
  Component,
  StyleSheet,
  Text,
  View,
} = React;

var APIConst = require('./APIConst');

class ThreadsListIOS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      networkStatus: null,
    };
  }

  componentDidMount(): void {
    fetch(`${APIConst.ENDPOINT}/threads`, { headers: APIConst.auth() })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({ networkStatus: response.status });
        }
      })
      .then((threads) => {
        this.setState({ threads });
      })
      .catch((err) => {
        throw err;
      });

  }

  render(): Component {
    let content = this.state.threads.map((thread) =>
      <Text style={styles.thread} key={thread._id}>
        {thread.name}
      </Text>
    );
    if (content.length === 0) {
      if (this.state.networkStatus !== null) {
        content =
          <Text style={styles.loading}>
            Server responded with {this.state.networkStatus}
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

}

var styles = StyleSheet.create({
  thread: {
    fontSize: 20,
    margin: 10,
  },
  loading: {
    color: '#333333',
  },
});

module.exports = ThreadsListIOS;
