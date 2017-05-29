import React, {Component} from 'react';
import PropTypes from 'prop-types';
import muiThemable from 'material-ui/styles/muiThemeable';
import JSONTree from 'react-json-tree';
import theme from './theme.js';

class DiffTree extends Component {
  render() {
    return (
      // TODO custom styling: add + and - icons, color accordingly for changes
      <div onClick={e => e.stopPropagation()}>
        <JSONTree
          data={this.props.json}
          theme={theme}
          hideRoot={true}
          invertTheme={false}
          getItemString={(type, data, itemType, itemString) => <span>{itemString}</span>}
          valueRenderer={raw => raw.replace(/"/g, '')}
          shouldExpandNode={(keyName, data, level) => false} />
      </div>
    );
  }
}

// TODO allow either array or object
DiffTree.propTypes = {
  json: PropTypes.object.isRequired
};

export default muiThemable()(DiffTree);
