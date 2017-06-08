import React, { Component } from 'react';

import ContentCard from '../components/content_card';
import GraphEditor from '../components/graph_editor';

class GraphsCard extends Component {
  render() {
    return (
      <ContentCard>
        <GraphEditor />
      </ContentCard>
    );
  }
}

export default GraphsCard;
