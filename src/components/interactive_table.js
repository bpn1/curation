import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const DateCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col].toLocaleString()}
  </Cell>
);

const ImageCell = ({rowIndex, data, col, ...props}) => (
  <ExampleImage
    src={data[rowIndex][col]}
  />
);

const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <a href="#">{data[rowIndex][col]}</a>
  </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

class InteractiveTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [{"id": 1, "name": "Test", "randomNumber": 1337},
        {"id": 2, "name": "Testerino", "randomNumber": 42}]
    };
  }

  render() {
    let {tableData} = this.state;

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
            <TableHeaderColumn tooltip="Identifier">ID</TableHeaderColumn>
            <TableHeaderColumn tooltip="Given name">Name</TableHeaderColumn>
            <TableHeaderColumn tooltip="Just a random number">Random Number</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={true}
          deselectOnClickaway={true}
          showRowHover={true}
          stripedRows={true}>
          {
            tableData.map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{index}</TableRowColumn>
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
