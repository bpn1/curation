import React, {Component, PropTypes} from 'react';
import muiThemable from 'material-ui/styles/muiThemeable';
import JSONTree from 'react-json-tree';
import theme from './theme.js';

class DiffTree extends Component {
  render() {
    return (
      // TODO implement commented functions using Redux reducers and actions
      // TODO custom styling: add + and - icons, color accordingly for changes
      <JSONTree data={this.props.json} theme={theme} invertTheme={false} />
    );
  }
}

DiffTree.propTypes = {
  json: React.PropTypes.object.isRequired
};

export default muiThemable()(DiffTree);