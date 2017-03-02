import React, {Component, PropTypes} from 'react';
import Inspector from 'react-json-inspector';
import styles from './difftree.css';

// include CSS class definitions
import 'react-json-inspector/json-inspector.css';
import './difftree.css';

class DiffTree extends Component {
  render() {
    return (
      // TODO compare Inspector, JSONTree and MuiTreeList (pros and cons)
      // TODO implement commented functions using Redux reducers and actions
      // TODO custom styling: add + and - icons, color accordingly for changes
      <Inspector data={this.props.json} style={styles.diffTree} />
    );
  }
}

DiffTree.propTypes = {
  json: React.PropTypes.object.isRequired
};

export default DiffTree;
