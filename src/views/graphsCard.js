import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ContentCard from '../components/content_card';
import GraphEditor from '../components/graph_editor';

class GraphsCard extends Component {
  render() {
    return (
      <ContentCard>
        <h1>Graphs</h1>
        <Grid fluid>
          <Row middle="xs">
            <Col xs>
              <GraphEditor />
            </Col>
          </Row>
        </Grid>
      </ContentCard>
    );
  }
}

export default GraphsCard;
