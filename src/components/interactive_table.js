import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import PropTypes from 'prop-types';
import DiffTree from './DiffTree';

class InteractiveTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: props.data,
      filteredData: props.data,
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
    const filteredList = this.state.tableData.filter(row => row[column]
      .toString()
      .toLowerCase()
      .indexOf(filterBy) !== -1);

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

  renderHeader(key, name, sortDirArrow) {
    return (
      <TableHeaderColumn tooltip={name} key={key}>
        <a onClick={this.sortRowsBy.bind(this, key)}>
          <h2 style={{ margin: 0 }}>{name} {this.state.sortBy === key ? sortDirArrow : ''}</h2>
        </a>
        <TextField
          style={{ maxWidth: '100%', width: '100%' }}
          ref={key + 'Header'}
          hintText={'Filter by ' + name + '...'}
          onChange={this.onFilterChange.bind(this, key)}
        />
      </TableHeaderColumn>
    );
  }

  render() {
    const { filteredData } = this.state;

    let sortDirArrow = '';
    if (this.state.sortDir !== null) {
      sortDirArrow = this.state.sortDir === 'DESC' ? '↓' : '↑';
    }

    return (
      <div>
        <Table
          height={this.state.height}
          selectable
          multiSelectable
          fixedHeader>
          <TableHeader
            displaySelectAll
            adjustForCheckbox>
            <TableRow>
              { this.props.headers.map(header => this.renderHeader(header.key, header.name, sortDirArrow)) }
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox
            deselectOnClickaway
            showRowHover
            stripedRows={false}>
            { filteredData.map((row, index) =>
              (<TableRow key={index} selected={row.selected}>
                { this.props.headers.map((header) => {
                  let content = '';
                  if(typeof row[header.key] === "string") {
                    content = row[header.key].toString();
                    //content = content.substring(1, content.length-1);
                  } else {
                    content = <DiffTree json={row[header.key]} />;
                  }
                  return (<TableRowColumn key={header.key}>{content}</TableRowColumn>);
                })}
              </TableRow>)
            ) }
          </TableBody>
        </Table>
        <IconButton style={{position: 'absolute', right: 15, top: 170}}>
          <SettingsIcon
            onTouchTap={console.log('settings!')} />
        </IconButton>
      </div>
    );
  }
}

InteractiveTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

export default InteractiveTable;
