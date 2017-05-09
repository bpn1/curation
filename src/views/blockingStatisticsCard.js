import React, { Component } from 'react';
import ContentCard from '../components/content_card';
import BlockingHistogram from '../components/blockingHistogram';

class BlockingStatisticsCard extends Component {
  render() {
    return (
      <ContentCard>
        <h1>Blocking Statistics</h1>
        <BlockingHistogram />
      </ContentCard>
    );
  }
}

export default BlockingStatisticsCard;
