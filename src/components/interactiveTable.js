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
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import UpArrowIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import DownArrowIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';

import DiffTree from './DiffTree';

class InteractiveTable extends Component {
  constructor(props) {
    super(props);

    // catch invalid data
    const data = this.validateAndFixData(props.data);

    this.state = {
      tableData: data,
      filteredData: data,
      selectedRows: [],
      sortBy: 'id',
      sortDir: null,
      headerFilter: {},
      expandedObjects: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    // when the data changes, clear the selection and reset filters
    if (nextProps.data && nextProps.data !== this.state.tableData) {
      const data = this.validateAndFixData(nextProps.data);
      this.setState({
        filteredData: data,
        tableData: data,
        selectedRows: []
      });
    }
  }

  onFilterChange(column, event) {
    if (!event.target.value) {
      this.setState({
        filteredData: this.state.tableData
      });
    }

    const filterBy = event.target.value.toString().toLowerCase();
    const filteredList = this.state.tableData.filter((row) => {
      let data = row[column] ? row[column] : 'null';

      if (!(typeof data === 'string') || !(data instanceof String)) {
        data = JSON.stringify(data);
      }

      return data
        .toString()
        .toLowerCase()
        .indexOf(filterBy) !== -1;
    });

    // clear all filter fields, update the content of the current field
    const headerFilter = { ...this.state.headerFilter };
    this.props.headers.forEach((header) => {
      if (header.key === column) {
        headerFilter[header.key] = event.target.value;
      } else {
        headerFilter[header.key] = '';
      }
    });

    this.setState({
      filteredData: filteredList,
      headerFilter
    });

    return true;
  }

  onRowSelection(rows) {
    const selectedRows = [];

    this.state.filteredData.forEach((row, i) => {
      row.selected = rows.indexOf(i) > -1;
      if (row.selected) {
        selectedRows.push(row);
      }
    });
    this.setState({ ...this.state, selectedRows });

    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(selectedRows);
    }
  }

  sortRowsBy(column) {
    let sortDir = this.state.sortDir;
    const sortBy = column;
    if (sortBy === this.state.sortBy) {
      sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
    } else {
      sortDir = 'DESC';
    }

    const rows = this.state.filteredData.slice();
    rows.sort((a, b) => {
      let sortVal = 0;

      if (a[sortBy] > b[sortBy]) {
        sortVal = 1;
      }
      if (a[sortBy] < b[sortBy]) {
        sortVal = -1;
      }
      if (sortDir === 'DESC') {
        sortVal *= -1;
      }

      return sortVal;
    });

    this.setState({ sortBy, sortDir, filteredData: rows });
  }

  validateAndFixData(tableData) {
    let data = tableData;
    if (data === undefined || data === null || !(data instanceof Array)) {
      console.error('Subject data is invalid! =>', data);
      data = [];
    }

    return data;
  }

  expandObject(evt, expandKey, key, isExpanded) {
    const expandedObjects = this.state.expandedObjects;
    if (!expandedObjects.hasOwnProperty(expandKey)) {
      expandedObjects[expandKey] = {};
    }

    expandedObjects[expandKey][key] = isExpanded;
    this.setState({ expandedObjects });

    evt.stopPropagation();
    evt.preventDefault();
  }

  renderHeader(key, name) {
    const sortDisabled = !(this.state.sortBy === key);
    const colors = this.props.muiTheme.palette;

    const iconColor = sortDisabled ? colors.neutralColor2 : colors.neutralColor1;

    const sortDirArrow =
      (this.state.sortDir === 'DESC' || sortDisabled || this.state.sortDir === null)
        ? <DownArrowIcon color={iconColor} />
        : <UpArrowIcon color={iconColor} />;

    const filterValue = this.state.headerFilter.hasOwnProperty(key) ? this.state.headerFilter[key] : '';

    return (
      <TableHeaderColumn key={key}>
        <div style={{ maxWidth: '80%' }}>
          <TextField
            style={{ maxWidth: '100%' }}
            ref={key + 'Header'}
            hintText={'Filter...'}
            floatingLabelText={name}
            floatingLabelFixed={false}
            floatingLabelStyle={{ color: colors.accent1Color, fontWeight: 'bold' }}
            floatingLabelFocusStyle={{ color: colors.accent1Color, fontWeight: 'normal' }}
            value={filterValue}
            onChange={this.onFilterChange.bind(this, key)}
          />
          <IconButton
            onClick={this.sortRowsBy.bind(this, key)}
            tooltip="Sort"
            touch
            tooltipPosition="bottom-center"
          >
            {sortDirArrow}
          </IconButton>
        </div>
      </TableHeaderColumn>
    );
  }

  render() {
    const { filteredData } = this.state;
    const fixedHeaderHeight = 75;
    return (
      <Table
        height={(this.props.height - fixedHeaderHeight).toString() + 'px'}
        selectable={this.props.selectable}
        multiSelectable={this.props.multiSelectable}
        fixedHeader
        onCellClick={this.props.onCellClick}
        onRowSelection={this.onRowSelection.bind(this)}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={this.props.showCheckboxes}
        >
          <TableRow>
            {this.props.headers.map((header) => {
              if (this.props.hiddenColumns.indexOf(header.key) > -1) {
                return '';
              }
              return this.renderHeader(header.key, header.name);
            })}
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.props.showCheckboxes}
          showRowHover
          deselectOnClickaway={false}
          stripedRows={false}
        >
          {filteredData.map((row, index) => {
            if (!row) {
              console.error('Row #' + index + ' is undefined/ null!');
              return '';
            }

            return (
              <TableRow key={JSON.stringify(row)} selected={row.selected}>
                {this.props.headers.map((header) => {
                  // don't render this column if it has been set to hidden
                  if (this.props.hiddenColumns.indexOf(header.key) > -1) {
                    return '';
                  }

                  let content = '';
                  if (!(header.key in row) || row[header.key] === null) {
                    content = <span style={{ color: 'red' }}>null</span>;
                  } else if (typeof row[header.key] === 'object') {
                    const expanded = this.state.expandedObjects[row[this.props.expandKey]];
                    const expandTreeByDefault = this.props.expandTreeByDefaultColumns.indexOf(header.key) !== -1;
                    if (expandTreeByDefault || (expanded && expanded[header.key])) {
                      content =
                        (<div>
                          {!expandTreeByDefault && <a
                            onClick={evt => this.expandObject(evt, row[this.props.expandKey], header.key, false)}
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                          >
                            Collapse
                          </a>}
                          <DiffTree json={row[header.key]} />
                        </div>);
                    } else {
                      content =
                        (<a
                          onClick={evt => this.expandObject(evt, row[this.props.expandKey], header.key, true)}
                          style={{ textDecoration: 'underline', cursor: 'pointer' }}
                        >
                          {Object.keys(row[header.key]).length} values
                        </a>);
                    }
                  } else {
                    content = row[header.key] ? row[header.key].toString() : 'No Score';
                  }
                  return (<TableRowColumn key={header.key}>{content}</TableRowColumn>);
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

InteractiveTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  muiTheme: PropTypes.object.isRequired,
  expandKey: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  expandTreeByDefaultColumns: PropTypes.array,
  onCellClick: PropTypes.func,
  showCheckboxes: PropTypes.bool,
  selectable: PropTypes.bool,
  multiSelectable: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  hiddenColumns: PropTypes.array
};

InteractiveTable.defaultProps = {
  showCheckboxes: true,
  expandTreeByDefaultColumns: [],
  selectable: true,
  multiSelectable: true,
  onCellClick: () => {
  },
  onSelectionChange: undefined,
  hiddenColumns: []
};

export default InteractiveTable;
