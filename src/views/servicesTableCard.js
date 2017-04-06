import React, { Component } from 'react';
import InteractiveTable from '../components/interactive_table';
import ContentCard from '../components/annotate';

const tableHeaders = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Name' },
  { key: 'importantNumber', name: 'Important Number' }
];

const tableData = [
  { id: 1, name: 'Test', importantNumber: 1337 },
  { id: 2, name: 'Testerino', importantNumber: 42 },
  { id: 3, name: 'Testung', importantNumber: 18 },
  { id: 1337, name: 'Testasterous', importantNumber: 10000 }
];

class ServicesTableCard extends Component {
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
export default ServicesTableCard;
