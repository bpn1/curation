import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import DuplicateTable from '../components/duplicateTable';
import SubjectTable from '../components/subject_table';
import ContentCard from '../components/content_card';

class DuplicateTableCard extends Component {
  headers = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    { key: 'aliases', name: 'Aliases' },
    { key: 'category', name: 'Category' },
    { key: 'properties', name: 'Properties' },
    { key: 'relations', name: 'Relations' },
    { key: 'candidateScore', name: 'Score' }
  ];
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={6}>
            <ContentCard>
              <DuplicateTable />
            </ContentCard>
          </Col>
          <Col xs={6}>
            <ContentCard>
              <SubjectTable fetchOnMount={false} headers={this.headers} />
            </ContentCard>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DuplicateTableCard;
