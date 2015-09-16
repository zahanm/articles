
'use strict';

const React = require('react-native');
const {
  Component,
  Navigator,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

const APIConst = require('./APIConst.js');

class ThreadsList extends Component {

  static propTypes = {
    nav: PropTypes.instanceOf(Navigator).isRequired,
    threads: PropTypes.array.isRequired,
  }

  render(): Component {
    return (
      <View>
        {this.props.threads.map((thread) =>
          <TouchableOpacity key={thread._id} onPress={() => this._to(thread)}>
            <Text style={styles.thread}>
              {thread.name}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  _to(thread): void {
    const id = thread._id;
    this.props.nav.push({ id: 'thread', title: 'Articles', threadID: id });
  }

}

const styles = StyleSheet.create({
  thread: {
    fontSize: 20,
    margin: 10,
  },
});

module.exports = ThreadsList;
