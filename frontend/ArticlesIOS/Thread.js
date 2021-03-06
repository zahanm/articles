
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
const LinksList = require('./LinksList.js');
const Share = require('./Share.js');

class Thread extends Component {

  static propTypes = {
    nav: PropTypes.instanceOf(Navigator).isRequired,
    threadID: PropTypes.string.isRequired,
  }

  state = {
    thread: null,
    linkIDs: null,
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
      <View style={styles.fill}>
        {this._renderHeader()}
        {this._renderSharer()}
        {this._renderLinks()}
      </View>
    );
  }

  componentDidMount(): void {
    this._loadThread().catch((err) => console.error(err));
  }

  _renderHeader(): Component {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontWeight: '500' }}>
          {this.state.thread.name}
        </Text>
      </View>
    );
  }

  _renderSharer(): Component {
    return <Share nav={this.props.nav} threadID={this.props.threadID} />;
  }

  _renderLinks(): Component {
    return <LinksList linkIDs={this.state.linkIDs} />;
  }

  async _loadThread(): Promise<void> {
    const qs = `id=${this.props.threadID}`;
    const response = await fetch(`${APIConst.ENDPOINT}/thread?${qs}`, {
      headers: APIConst.authenticatedHeaders(),
    });
    if (!response.ok) {
      this.props.nav.push({ id: 'response', status: response.status });
      return;
    }
    const thread = await response.json();
    const linkIDs = thread.contents;
    this.setState({ thread, linkIDs });
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
