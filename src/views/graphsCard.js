import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sizeMe } from 'react-sizeme';

import ContentCard from '../components/content_card';
import GraphEditor from '../components/graph_editor';

class GraphsCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    return (
      <ContentCard>
        <GraphEditor height={this.props.size.height - topAndBottomPadding} />
      </ContentCard>
    );
  }
}

GraphsCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
  }).isRequired
};

export default sizeMe({ monitorHeight: true, monitorWidth: false })(GraphsCard);
