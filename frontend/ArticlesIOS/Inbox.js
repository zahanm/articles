
'use strict';

let React = require('react-native');
let {
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

let APIConst = require('./APIConst.js');
let ThreadsList = require('./ThreadsList.js');

/**
 * Fetches and shows all threads you are a participant in
 */
class Inbox extends Component {

  static propTypes = {
    nav: PropTypes.instanceOf(Navigator).isRequired,
  }

  state = {
    threads: [],
  }

  render(): Component {
    if (this.state.threads.length === 0) {
      return (
        <View style={[styles.fill, styles.cta]}>
          <ActivityIndicatorIOS animating={true} />
        </View>
      );
    }
    return (
      <View style={styles.fill}>
        <ThreadsList threads={this.state.threads} />
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
    this._reloadThreads();
  }

  _refresh = () => {
    this.setState({ threads: [] }); // no threads currently
    this._reloadThreads();
  }

  async _reloadThreads(): Promise<void> {
    let response = await fetch(`${APIConst.ENDPOINT}/threads`, {
      headers: APIConst.authenticatedHeaders(),
    });
    if (!response.ok) {
      this.props.nav.push({ id: 'response', status: response.status });
      return;
    }
    let threads = await response.json();
    this.setState({ threads });
  }

}

let styles = StyleSheet.create({
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
