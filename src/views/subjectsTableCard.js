import React, { Component } from 'react';
import SubjectTable from '../components/subject_table';
import ContentCard from '../components/content_card';

class SubjectsTableCard extends Component {
  render() {
    return (
      <ContentCard>
        <SubjectTable />
      </ContentCard>
    );
  }
}
export default SubjectsTableCard;
