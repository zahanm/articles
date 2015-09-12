
'use strict';

var React = require('react-native');
var {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

var APIConst = require('./APIConst');

class ThreadsListIOS extends Component {

  static propTypes = {
    threads: PropTypes.array.isRequired
  }

  render(): Component {
    // assert(this.props.threads.length > 0);
    return (
      <View>
        {this.props.threads.map((thread) =>
          <Text style={styles.thread} key={thread._id}>
            {thread.name}
          </Text>
        )}
      </View>
    );
  }

}

var styles = StyleSheet.create({
  thread: {
    fontSize: 20,
    margin: 10,
  },
});

module.exports = ThreadsListIOS;
