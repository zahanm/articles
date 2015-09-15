
'use strict';

const React = require('react-native');
const {
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

class Compose extends Component {

  static propTypes = {
    nav: PropTypes.instanceOf(Navigator).isRequired,
  }

  state = {
    groupname: '',
  }

  render(): Component {
    return (
      <View style={styles.fill}>
        <TextInput
          style={[styles.bottomSpace, styles.noEdge, {
            backgroundColor: '#eee',
            height: 20,
          }]}
          placeholder="Group Name"
          onChangeText={(groupname) => this.setState({ groupname })}
          value={this.state.groupname}
        />
        <TouchableHighlight
          style={[styles.bottomSpace, styles.noEdge, styles.submitButton]}
          onPress={this._createThread}
        >
          <Text style={styles.submitButtonText}>Create</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _createThread = async () => {
    const name = this.state.groupname;
    const headers = APIConst.authenticatedHeaders();
    headers.set('Content-Type', 'application/json');
    const response = await fetch(`${APIConst.ENDPOINT}/thread`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      this.props.nav.push({ id: 'response', title: 'Response', status: response.status });
      return;
    }
    // all okay. temporarily show status
    this.props.nav.push({ id: 'response', title: 'Response', status: response.status });
  }

}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  bottomSpace: {
    padding: 5,
    marginBottom: 20,
  },
  noEdge: {
    marginLeft: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#eee',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

module.exports = Compose;
