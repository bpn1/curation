import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

class InteractiveTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableData = [
      {"id": 1, "name": "Test", "randomNumber": 1337},
      {"id": 2, "name": "Testerino", "randomNumber": 42},
      {"id": 3, "name": "Testung", "randomNumber": 18},
      {"id": 4, "name": "Name", "randomNumber": "Random number"}
    ];
    this.state = {
      filteredData: this.tableData
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

    this.setState({
      filteredData: filteredList
    });

    return true;
  }

  render() {
    let {filteredData} = this.state;

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
            <TableHeaderColumn tooltip="Identifier">
              <TextField hintText="ID" onChange={this.onFilterChange.bind(this, 'id')} />
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Given name">
              <TextField hintText="Name" onChange={this.onFilterChange.bind(this, 'name')} />
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Just a random number">
              <TextField hintText="Random number" onChange={this.onFilterChange.bind(this, 'randomNumber')} />
            </TableHeaderColumn>
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
              &copy; 2016-17 Somebody etc. et al.
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  }
}

export default InteractiveTable
