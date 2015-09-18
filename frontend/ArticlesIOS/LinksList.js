
'use strict';

const React = require('react-native');
const {
  ActivityIndicatorIOS,
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const APIConst = require('./APIConst.js');

class LinksList extends Component {

  static propTypes = {
    linkIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  state = {
    links: [],
  }

  render(): Component {
    if (this.state.links === null) {
      return (
        <View style={[styles.fill, styles.cta]}>
          <ActivityIndicatorIOS animating={true} />
        </View>
      );
    }
    const links = this.state.links.map((l) => {
      return (
        <View key={l._id} style={{ paddingVertical: 5 }}>
          <Text style={{ paddingVertical: 5 }}>
            {l.text}
          </Text>
          <Text style={{ paddingVertical: 5, color: 'blue' }}>
            {l.url}
          </Text>
        </View>
      );
    });
    return (
      <View style={{ paddingHorizontal: 10 }}>
        {links}
      </View>
    );
  }

  componentDidMount(): void {
    this._loadLinks().catch((err) => console.error(err));
  }

  async _loadLinks(): Promise<void> {
    const links = [];
    for (let linkID of this.props.linkIDs) {
      const qs = `id=${linkID}`;
      const response = await fetch(`${APIConst.ENDPOINT}/link?${qs}`, {
        headers: APIConst.authenticatedHeaders(),
      });
      const link = await response.json();
      links.push(link);
    }
    this.setState({ links });
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

module.exports = LinksList;
