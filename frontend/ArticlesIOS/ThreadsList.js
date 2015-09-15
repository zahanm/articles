
'use strict';

const React = require('react-native');
const {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const APIConst = require('./APIConst.js');

class ThreadsList extends Component {

  static propTypes = {
    threads: PropTypes.array.isRequired,
  }

  render(): Component {
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

const styles = StyleSheet.create({
  thread: {
    fontSize: 20,
    margin: 10,
  },
});

module.exports = ThreadsList;
