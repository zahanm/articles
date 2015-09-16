
'use strict';

const React = require('react-native');
const {
  ActivityIndicatorIOS,
  Component,
  Navigator,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

const APIConst = require('./APIConst.js');
const ThreadsList = require('./ThreadsList.js');

/**
 * Fetches and shows all threads you are a participant in
 */
class Inbox extends Component {

  static propTypes = {
    nav: PropTypes.instanceOf(Navigator).isRequired,
  }

  state = {
    threads: null,
  }

  render(): Component {
    if (this.state.threads === null) {
      return (
        <View style={[styles.fill, styles.cta]}>
          <ActivityIndicatorIOS animating={true} />
        </View>
      );
    }
    return (
      <View style={styles.fill}>
        <ThreadsList nav={this.props.nav} threads={this.state.threads} />
        <TouchableHighlight
          style={[styles.button]}
          onPress={this._refresh}
        >
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableHighlight>
      </View>
    );
  }

  componentDidMount(): void {
    this._reloadThreads().catch((err) => console.error(err));
  }

  _refresh = () => {
    this.setState({ threads: [] }); // no threads currently
    this._reloadThreads().catch((err) => console.error(err));
  }

  async _reloadThreads(): Promise<void> {
    const response = await fetch(`${APIConst.ENDPOINT}/threads`, {
      headers: APIConst.authenticatedHeaders(),
    });
    if (!response.ok) {
      this.props.nav.push({ id: 'response', status: response.status });
      return;
    }
    const threads = await response.json();
    this.setState({ threads });
  }

}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  cta: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    width: 75,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
  },
});

module.exports = Inbox;
