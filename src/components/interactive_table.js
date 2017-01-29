import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';

class InteractiveTable extends React.Component {
  constructor(props) {
    super(props);
    this.headers = [
      {key: "id", name: "ID"},
      {key: "name", name: "Name"},
      {key: "randomNumber", name: "Random Number"}
    ];
    this.tableData = [
      {"id": 1, "name": "Test", "randomNumber": 1337},
      {"id": 2, "name": "Testerino", "randomNumber": 42},
      {"id": 3, "name": "Testung", "randomNumber": 18},
      {"id": 4, "name": "Name", "randomNumber": "Random number"}
    ];
    this.state = {
      filteredData: this.tableData,
      sortBy: 'id',
      sortDir: null
    };
  }

  onFilterChange(column, event) {
    if(!event.target.value) {
      this.setState({
        filteredData: this.tableData
      });
    }

    const filterBy = event.target.value.toString().toLowerCase();
    const filteredList = this.tableData.filter((row) => {
      return row[column].toString().toLowerCase().indexOf(filterBy) !== -1
    });

    // clear other filter fields
    this.headers.forEach((header) => {
      if(header.key == column)
        return;
      // TODO Field clearing should be implemented by using a controlled TextField subclass instead of using getInputNode
      this.refs[header.key + "Header"].getInputNode().value = null;
    });

    this.setState({
      filteredData: filteredList
    });

    return true;
  }

  sortRowsBy(column) {
    let sortDir = this.state.sortDir;
    let sortBy = column;
    if(sortBy == this.state.sortBy) {
      sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
    } else {
      sortDir = 'DESC';
    }

    let rows = this.state.filteredData.slice();
    rows.sort((a, b) => {
      let sortVal = 0;

      if(a[sortBy] > b[sortBy])
        sortVal = 1;
      if(a[sortBy] < b[sortBy])
        sortVal = -1;
      if(sortDir == 'DESC')
        sortVal *= -1;

      return sortVal;
    });

    this.setState({sortBy, sortDir, filteredData: rows});
  }

  renderHeader(key, name, sortDirArrow) {
    return (
      <TableHeaderColumn tooltip={name} key={key}>
        <a onClick={this.sortRowsBy.bind(this, key)}><h2 style={{margin: 0}}>{name} {this.state.sortBy === key ? sortDirArrow : ''}</h2></a>
        <TextField ref={key+"Header"} hintText={"Filter by " + name + "..."} onChange={this.onFilterChange.bind(this, key)} />
      </TableHeaderColumn>
    )
  }

  render() {
    let {filteredData} = this.state;

    let sortDirArrow = '';
    if (this.state.sortDir !== null) {
      sortDirArrow = this.state.sortDir === 'DESC' ? '↓' : '↑';
    }

    return <div>
      <Table
        height={this.state.height}
        selectable={true}
        multiSelectable={true}
        fixedHeader={true}>
        <TableHeader
          displaySelectAll={true}
          adjustForCheckbox={true}>
          <TableRow>
            { this.headers.map((header) => {
              return this.renderHeader(header.key, header.name, sortDirArrow);
            }) }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={true}
          deselectOnClickaway={true}
          showRowHover={true}
          stripedRows={false}>
          {
            filteredData.map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{row.id}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.randomNumber}</TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
        <TableFooter
          adjustForCheckbox={true}>
          <TableRow>
            <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
              Footer
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  }
}

export default InteractiveTable
