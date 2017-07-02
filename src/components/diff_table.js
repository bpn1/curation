import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import muiThemeable from 'material-ui/styles/muiThemeable';

import InteractiveTable from './interactive_table';
import versionDiffDuck from '../ducks/versionDiffDuck';

const plainDataKeys = ['oldversion', 'newversion', 'id'];
const defaultVersions = ['f52b62f0-5ca5-11e7-96c5-95e0dc4b232f', 'aa8ac8e0-5ca9-11e7-aea9-c37dbfcb3b83'];

class DiffTable extends Component {
  constructor(props) {
    super(props);

    let versions = window.location.hash.indexOf('?') === -1 ? [] :
      window.location.hash
        .split('?')[1]
        .split('&')
        .map(str => str.split('='))
        .filter(param => param[0] === 'versions' && param.length > 1 && param[1] !== '')
        .map(param => param[1].split(',').map(key => key.trim()));
    versions = versions.length > 0 && versions[0].length === 2 ? versions[0] : defaultVersions;

    this.state = {
      tableData: [],
      versions
    };
  }

  componentDidMount() {
    this.listeners.reloadDuplicates();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tableData) {
      const tableData = nextProps.tableData.map((entry) => {
        Object.keys(entry).map((key) => {
          if (entry[key] && plainDataKeys.indexOf(key) < 0) {
            entry[key] = JSON.parse(entry[key]);
          }
        });
        return entry;
      });
      this.setState({ tableData });
    }
  }

  headers = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    { key: 'master', name: 'Master' },
    { key: 'aliases', name: 'Aliases' },
    { key: 'category', name: 'Category' },
    { key: 'properties', name: 'Properties' },
    { key: 'relations', name: 'Relations' }
  ];

  render() {
    return (
      <InteractiveTable
        ref="table"
        height={this.props.height}
        expandKey="id"
        headers={this.headers}
        data={this.state.tableData}
        showCheckboxes={false}
        multiSelectable={false}
        selectable={false}
        muiTheme={this.props.muiTheme}
      />
    );
  }

  listeners = {
    reloadDuplicates: () => {
      // TODO make count a user option
      this.props.actions.versionDiff.fetchChanges(this.state.versions[0], this.state.versions[1], 100);
    }
  };
}

DiffTable.propTypes = {
  height: PropTypes.number.isRequired
};

/* connection to Redux */
function mapStateToProps(state) {
  return {
    tableData: state.versiondiff.entities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      versionDiff: bindActionCreators(versionDiffDuck.creators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(DiffTable));
