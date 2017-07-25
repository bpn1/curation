import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sizeMe } from 'react-sizeme';

import ContentCard from '../components/contentCard';
import BlockingHistogram from '../components/blockingHistogram';

class BlockingStatisticsCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    const titleSize = 60;
    return (
      <ContentCard>
        <h1>Blocking statistics</h1>
        <BlockingHistogram height={this.props.size.height - titleSize - topAndBottomPadding} />
      </ContentCard>
    );
  }
}

BlockingStatisticsCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired
};

export default sizeMe({ monitorHeight: true })(BlockingStatisticsCard);
