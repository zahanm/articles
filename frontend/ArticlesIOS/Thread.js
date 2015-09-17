
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
    links: null,
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
      <View>
        {this._renderHeader()}
        {this._renderLinks()}
      </View>
    );
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

  _renderLinks(): Component {
    const links = this.state.links.map((l) => {
      return (
        <Text style={styles.link} key={l._id} style={{ paddingVertical: 5 }}>
          {l.url}
        </Text>
      );
    });
    return (
      <View style={{ paddingHorizontal: 10 }}>
        {links}
      </View>
    );
  }

  componentDidMount(): void {
    this._loadThread().catch((err) => console.error(err));
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
    const links = [];
    for (let linkID of thread.contents) {
      const qs = `id=${linkID}`
      const response = await fetch(`${APIConst.ENDPOINT}/link?${qs}`, {
        headers: APIConst.authenticatedHeaders(),
      });
      const link = await response.json();
      links.push(link);
    }
    this.setState({ thread, links });
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
