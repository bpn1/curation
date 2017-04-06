import React, { Component } from 'react';
import InteractiveTable from '../components/interactive_table';
import ContentCard from '../components/annotate';

const tableHeaders = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Name' },
  { key: 'importantNumber', name: 'Much More Important Number' }
];

const tableData = [
  { id: 1, name: 'Test', importantNumber: 12345 },
  { id: 2, name: 'Testerino', importantNumber: 654321 },
  { id: 3, name: 'Testung', importantNumber: 67890 },
  { id: 1337, name: 'Testasterous', importantNumber: 98765 }
];

class DataTableCard extends Component {
  render() {
    return (
      <ContentCard>
        <InteractiveTable
          headers={tableHeaders} data={tableData}
        />
      </ContentCard>
    );
  }
}
export default DataTableCard;
