
'use strict';

let React = require('react-native');
let {
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
      <View style={styles.cta}>
        <Text>Server responded with {this.props.status}</Text>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  cta: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = ServerResponse;
