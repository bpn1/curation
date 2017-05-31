import React, { Component } from 'react';
import PropTypes from 'prop-types';
import muiThemable from 'material-ui/styles/muiThemeable';
import JSONTree from 'react-json-tree';
import theme from './theme';

class DiffTree extends Component {
  render() {
    return (
      // TODO custom styling: add + and - icons, color accordingly for changes
      <div onClick={e => e.stopPropagation()}>
        <JSONTree
          data={this.props.json}
          theme={theme}
          hideRoot
          invertTheme={false}
          getItemString={(type, data, itemType, itemString) => <span>{itemString}</span>}
          valueRenderer={raw => raw.toString().replace(/"/g, '')}
          shouldExpandNode={(keyName, data, level) => false}
        />
      </div>
    );
  }
}

// TODO allow either array or object
DiffTree.propTypes = {
  json: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
};

export default muiThemable()(DiffTree);
