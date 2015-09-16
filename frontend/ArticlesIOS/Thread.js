
'use strict';

const React = require('react-native');
const {
  ActivityIndicatorIOS,
  Component,
  Navigator,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const APIConst = require('./APIConst.js');
const ThreadsList = require('./ThreadsList.js');

class Thread extends Component {

  static propTypes = {
    nav: PropTypes.instanceOf(Navigator).isRequired,
    threadID: PropTypes.string.isRequired,
  }

  state = {
    thread: null,
  }

  render(): Component {
    if (this.state.thread === null) {
      return (
        <View style={[styles.fill, styles.cta]}>
          <ActivityIndicatorIOS animating={true} />
        </View>
      );
    }
    return (
      <View style={[styles.fill, styles.cta]}>
        <Text>{this.state.thread.name}</Text>
      </View>
    );
  }

  componentDidMount(): void {
    this._loadThread().catch((err) => console.error(err));
  }

  async _loadThread(): Promise<void> {
    const qs = `id=${this.props.threadID}`;
    const response = await fetch(`${APIConst.ENDPOINT}/thread?${qs}`, {
      headers: APIConst.authenticatedHeaders(),
    });
    if (!response.ok) {
      this.props.nav.push({ id: 'response', status: response.status });
      return;
    }
    const thread = await response.json();
    this.setState({ thread });
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
});

module.exports = Thread;
