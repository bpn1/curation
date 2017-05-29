import React, { Component } from 'react';
import ContentCard from '../components/content_card';

import GraphView from '../components/graph_view';

class GraphsCard extends Component {
  render() {
    return (
      <ContentCard>
        <h1>Graphs</h1>
        <GraphView />
      </ContentCard>
    );
  }
}

export default GraphsCard;
