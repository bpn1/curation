import React, {Component, PropTypes} from 'react';
import {MuiTreeList} from 'react-treeview-mui';

// TODO load from this.props
const listItems = [
  {depth: 0, children: [1]},
  {depth: 1, parentIndex: 0, name: '<span class="change-removed">Testerino</span>'},
  {depth: 1, parentIndex: 0, children: [3], name: "TestCompany 1337"},
  {depth: 2, parentIndex: 2, name: "LeetWorks"}
];

class DiffTree extends Component {
  render() {
    return (
      // TODO implement commented functions using Redux reducers and actions
      // TODO custom styling: add + and - icons, color accordingly for changes
      <MuiTreeList
        listItems={listItems}
        contentKey={'name'}
        useFolderIcons={true}
        haveSearchbar={true} />
        /* style={}
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
