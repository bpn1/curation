import React, { Component } from 'react';
import ContentCard from '../components/content_card';

import { Grid, Row, Col } from 'react-flexbox-grid';

import GraphRenderer from '../components/graph_renderer';
import GraphEditor from '../components/graph_editor';

class GraphsCard extends Component {
  render() {
    return (
      <ContentCard>
        <h1>Graphs</h1>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={12} sm={6} lg={6}>
              <GraphRenderer />
            </Col>
            <Col xs={12} sm={6} lg={6}>
              <GraphEditor />
            </Col>
          </Row>
        </Grid>
      </ContentCard>
    );
  }
}

export default GraphsCard;
