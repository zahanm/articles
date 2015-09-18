
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

class Share extends Component {

  static propTypes = {
    nav: PropTypes.instanceOf(Navigator).isRequired,
    threadID: PropTypes.string.isRequired,
  }

  state = {
    url: '',
    text: '',
  }

  render(): Component {
    return (
      <View style={[styles.fill, styles.cta, styles.sides]}>
        <TextInput
          style={[styles.space, styles.input]}
          placeholder="URL"
          onChangeText={(url) => this.setState({ url })}
          value={this.state.url}
        />
        <TextInput
          style={[styles.space, styles.input]}
          placeholder="Message"
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <TouchableHighlight style={[styles.submitButton]} onPress={this._share}>
          <Text style={styles.submitButtonText}>Share</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _share = () => {
    this._shareImpl().catch((err) => console.error(err));
  }

  async _shareImpl(): Promise<void> {
    const id = this.props.threadID;
    const url = this.state.url;
    const text = this.state.text;
    const headers = APIConst.authenticatedHeaders();
    headers.set('Content-Type', 'application/json');
    const response = await fetch(`${APIConst.ENDPOINT}/link`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ id, url, text }),
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
  cta: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sides: {
    marginHorizontal: 10,
  },
  space: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
    height: 40,
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  submitButtonText: {
    color: '#eee',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

module.exports = Share;
