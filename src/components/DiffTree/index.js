import React, {Component} from 'react';
import PropTypes from 'prop-types';
import muiThemable from 'material-ui/styles/muiThemeable';
import JSONTree from 'react-json-tree';
import theme from './theme.js';

class DiffTree extends Component {
  render() {
    return (
      // TODO custom styling: add + and - icons, color accordingly for changes
      <JSONTree
        data={this.props.json}
        theme={theme}
        invertTheme={false}
        shouldExpandNode={(keyName, data, level) => false} />
    );
  }
}

// TODO allow either array or object
DiffTree.propTypes = {
  json: PropTypes.object.isRequired
};

export default muiThemable()(DiffTree);
