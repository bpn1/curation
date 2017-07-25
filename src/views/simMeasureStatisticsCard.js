import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sizeMe } from 'react-sizeme';

import ContentCard from '../components/contentCard';
import SimilarityHistogram from '../components/similarityHistogram';

class StatisticsCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    const titleSize = 60;
    return (
      <ContentCard>
        <h1>Similarity Measure Statistics</h1>
        <SimilarityHistogram height={this.props.size.height - titleSize - topAndBottomPadding} />
      </ContentCard>
    );
  }
}

StatisticsCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired
};

export default sizeMe({ monitorHeight: true })(StatisticsCard);
