import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { sizeMe } from 'react-sizeme';

import DuplicateTable from '../components/duplicateTable';
import SubjectTable from '../components/subject_table';
import ContentCard from '../components/content_card';

const headers = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Name' },
  { key: 'aliases', name: 'Aliases' },
  { key: 'category', name: 'Category' },
  { key: 'properties', name: 'Properties' },
  { key: 'relations', name: 'Relations' },
  { key: 'candidateScore', name: 'Score' }
];

class DuplicateTableCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    return (
      <Grid fluid style={{ padding: 0, height: '100%' }} >
        <Row style={{ height: '100%' }}>
          <Col xs>
            <ContentCard>
              <DuplicateTable height={this.props.size.height - topAndBottomPadding} />
            </ContentCard>
          </Col>
          <Col xs>
            <ContentCard>
              <SubjectTable
                height={this.props.size.height - topAndBottomPadding}
                fetchOnMount={false}
                headers={headers}
              />
            </ContentCard>
          </Col>
        </Row>
      </Grid>);
  }
}

DuplicateTableCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired
};

export default sizeMe({ monitorHeight: true })(DuplicateTableCard);
