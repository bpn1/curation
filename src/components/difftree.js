import React, {Component, PropTypes} from 'react';
import JSONTree from 'react-json-tree';

// TODO load from this.props
const listItems = [
  {depth: 0, children: [1]},
  {depth: 1, parentIndex: 0, name: '<span class="change-removed">Testerino</span>'},
  {depth: 1, parentIndex: 0, children: [3], name: "TestCompany 1337"},
  {depth: 2, parentIndex: 2, name: "LeetWorks"}
];

const json = {
  array: [1,2,3],
  bool: false,
  object: {
    foo: 'bar'
  }
};

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};

/*const styles = {
  padding: 10,
  borderRadius: 10,
  backgroundImage: 'linear-gradient(to bottom, rgb(255, 167, 38), rgb(150, 62, 5)',
  backgroundRepeat: 'repeat-x',
  borderColor: 'rgb(150, 62, 5)',
  color: '#333',
  textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)'
};*/

const styles = {
  backgroundColor: '#0000'
};

class DiffTree extends Component {
  render() {
    return (
      // TODO compare JSONTree and MuiTreeList (pros and cons)
      <JSONTree data={json} theme={theme} invertTheme={false} style={styles} />
      // TODO implement commented functions using Redux reducers and actions
      // TODO custom styling: add + and - icons, color accordingly for changes
      /*<MuiTreeList
        listItems={listItems}
        contentKey={'name'}
        useFolderIcons={true}
        haveSearchbar={true}
        style={}
        listItemsIsEnabled={this.props.listItemIsEnabled}
        expandedListItems={this.props.expandedListItems}
        activeListItmes={this.props.activeListItems}
        handleTouchTap={this.props.handleTouchTap}
        handleTouchTapInSearchMode={this.props.handleTouchTapInSearchMode}
        handleSearch={this.props.handleSearch}
        searchTerm={this.props.searchTerm} />*/
    );
  }
}

// TODO wrap in Redux container (or get content from parent)
export default DiffTree;
