
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

  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      badResponseStatus: null,
    };
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

  componentDidMount(): void {
    fetch(`${APIConst.ENDPOINT}/threads`, { headers: APIConst.auth() })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({ badResponseStatus: response.status });
        }
      })
      .then((threads) => { this.setState({ threads }); })
      .catch((err) => { throw err; });
  }

}

var styles = StyleSheet.create({
  loading: {
    color: '#333333',
  },
});

module.exports = InboxIOS;
