
'use strict';

const React = require('react-native');
const {
  Component,
  Navigator,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

class ServerResponse extends Component {

  static propTypes = {
    nav: PropTypes.instanceOf(Navigator).isRequired,
    status: PropTypes.number.isRequired,
  }

  render(): Component {
    return (
      <View style={[styles.fill, styles.cta]}>
        <Text>Server responded with {this.props.status}</Text>
      </View>
    );
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

module.exports = ServerResponse;
