
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

  state = {
    threads: [],
  }

  static propTypes = {
    nav: PropTypes.instanceOf(Navigator).isRequired,
  }

  render(): Component {
    return (
      <View style={styles.fill}>
        {this.renderCompose()}
        {this.renderThreads()}
      </View>
    );
  }

  renderCompose(): Component {
    return (
      <View style={[styles.row, styles.end]}>
        <TouchableHighlight style={{ width: 30 }} onPress={this._goToCompose}>
          <Text>new</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderThreads(): Component {
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
      </View>
    );
  }

  _goToCompose = () => {
    this.props.nav.push({ id: 'compose', title: 'Compose' });
  }

  async componentDidMount(): Promise<void> {
    const response = await fetch(`${APIConst.ENDPOINT}/threads`, {
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

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  cta: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
});

module.exports = Inbox;
