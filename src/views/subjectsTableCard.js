import React, { Component } from 'react';
import SubjectTable from '../components/subject_table';
import ContentCard from '../components/content_card';

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

class SubjectsTableCard extends Component {
  render() {
    return (
      <ContentCard>
        <SubjectTable data={tableData} />
      </ContentCard>
    );
  }
}
export default SubjectsTableCard;
