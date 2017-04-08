import React, { Component } from 'react';
import InteractiveTable from '../components/interactive_table';
import ContentCard from '../components/content_card';

const tableData = [{ id: '1', properties: 'none', relations: 'none' }];
const tableHeaders = [
  { key: 'id', name: 'ID' },
  { key: 'properties', name: 'Properties' },
  { key: 'relations', name: 'Relations' }
];

class DataTableCard extends Component {
  render() {
    return (
      <ContentCard>
        <InteractiveTable
          ref="table" headers={tableHeaders} data={tableData}
        />
      </ContentCard>
    );
  }
}
export default DataTableCard;
