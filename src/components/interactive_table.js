import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import DiffTree from './DiffTree';

class InteractiveTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: props.data,
      filteredData: props.data,
      selectedRows: [],
      sortBy: 'id',
      sortDir: null
    };
  }

  onFilterChange(column, event) {
    if (!event.target.value) {
      this.setState({
        filteredData: this.state.tableData
      });
    }

    const filterBy = event.target.value.toString().toLowerCase();
    const filteredList = this.state.tableData.filter(row => {
      const data = row[column] ? row[column] : "null";
      return data
        .toString()
        .toLowerCase()
        .indexOf(filterBy) !== -1;
    });

    // clear other filter fields
    this.props.headers.forEach((header) => {
      if(header.key === column) {
        return;
      }
      // TODO Field clearing should be implemented by using a controlled TextField subclass (setState)
      // instead of using getInputNode().value
      this.refs[header.key + 'Header'].getInputNode().value = '';
    });

    this.setState({
      filteredData: filteredList
    });

    return true;
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

  onRowSelection(rows) {
    let selectedRows = [];

    this.state.tableData.forEach((row, i) => {
      row.selected = rows.indexOf(i) > -1;
      if(row.selected)
        selectedRows.push(row);
    });
    this.setState({...this.state, selectedRows});
  }

  renderHeader(key, name, sortDirArrow) {
    return (
      <TableHeaderColumn key={key}>
        <a onClick={this.sortRowsBy.bind(this, key)}>
          <h2 style={{ margin: 0 }}>{name} {this.state.sortBy === key ? sortDirArrow : ''}</h2>
        </a>
        <TextField
          style={{ maxWidth: '100%', width: '100%' }}
          ref={key + 'Header'}
          hintText={'Filter'}
          onChange={this.onFilterChange.bind(this, key)}
        />
      </TableHeaderColumn>
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      // if the data has changed, clear the selection
      let selectedRows = this.state.selectedRows;
      if(nextProps.data !== this.state.tableData)
        selectedRows = [];

      this.setState({
        filteredData: nextProps.data,
        tableData: nextProps.data,
        selectedRows
      });
    }
  }

  render() {
    const { filteredData } = this.state;

    let sortDirArrow = '';
    if (this.state.sortDir !== null) {
      sortDirArrow = this.state.sortDir === 'DESC' ? '↓' : '↑';
    }

    // TODO adapt Table height to window size changes (see http://stackoverflow.com/a/42141641)
    // TODO or use e.g. flexbox for adaptive sizing

    return (
      <div>
        <Table
          height={(window.innerHeight / 2).toString() + 'px'}
          selectable
          multiSelectable
          fixedHeader
          onRowSelection={this.onRowSelection.bind(this)}>
          <TableHeader
            displaySelectAll
            adjustForCheckbox>
            <TableRow>
              <TableHeaderColumn>
                <h2 style={{ margin: 0, textAlign: 'center' }}>Actions</h2>
              </TableHeaderColumn>
              { this.props.headers.map(header => this.renderHeader(header.key, header.name, sortDirArrow)) }
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox
            showRowHover
            deselectOnClickaway={false}
            stripedRows={false}>
            { filteredData.map((row, index) =>
              (<TableRow key={index} selected={row.selected}>
                <TableRowColumn>
                  <div>
                    { this.props.buttonColumnGenerator(index, row) }
                  </div>
                </TableRowColumn>
                { this.props.headers.map(header => {
                  let content = '';
                  if(row[header.key] === null) {
                    content = <span style={{ color: "red" }}>null</span>;
                  } else if(typeof row[header.key] === "object") {
                    content = <DiffTree json={row[header.key]} />;
                  } else {
                    content = row[header.key].toString();
                  }
                  return (<TableRowColumn key={header.key}>{content}</TableRowColumn>);
                }) }
              </TableRow>)
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

InteractiveTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  buttonColumnGenerator: PropTypes.func
};

InteractiveTable.defaultProps = {
  buttonColumnGenerator: (index, row) => {}
};

export default InteractiveTable;
