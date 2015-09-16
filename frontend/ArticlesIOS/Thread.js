
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
    try {
      this._loadThread();
    } catch (err) {
      throw err;
    }
  }

  async _loadThread(): Promise<void> {
    throw new Error('testing');
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
