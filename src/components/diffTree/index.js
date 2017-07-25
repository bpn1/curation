/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import muiThemable from 'material-ui/styles/muiThemeable';
import JSONTree from 'react-json-tree';
import theme from './theme';

class DiffTree extends Component {
  flattenJSON(obj) {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj === 'string') return obj;
    if (obj instanceof Array) {
      if (obj.length === 1) return obj[0];
      return obj;
    }

    Object.keys(obj).forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        obj[key] = this.flattenJSON(obj[key]);
      }
    });

    return obj;
  }

  render() {
    const json = this.flattenJSON(Object.assign({}, this.props.json));

    return (
      // TODO custom styling: add + and - icons, color accordingly for changes
      <div onClick={e => e.stopPropagation()}>
        <JSONTree
          data={json}
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
