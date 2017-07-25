import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sizeMe } from 'react-sizeme';

import ContentCard from '../components/contentCard';
import ClassifierHistogram from '../components/classifierHistogram';

class ClassifierStatisticsCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    const titleSize = 60;
    return (
      <ContentCard>
        <h1>Classifier Statistics</h1>
        <ClassifierHistogram height={this.props.size.height - titleSize - topAndBottomPadding} />
      </ContentCard>
    );
  }
}

ClassifierStatisticsCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired
};

export default sizeMe({ monitorHeight: true })(ClassifierStatisticsCard);
