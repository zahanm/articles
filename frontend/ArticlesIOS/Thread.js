
'use strict';

let React = require('react-native');
let {
  ActivityIndicatorIOS,
  Component,
  Navigator,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

let APIConst = require('./APIConst.js');
let ThreadsList = require('./ThreadsList.js');

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

let styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  cta: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Thread;
