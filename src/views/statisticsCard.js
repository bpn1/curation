import React, { Component } from 'react';
import { randomHistogram } from '../api/helpers/random_data';
import ContentCard from '../components/content_card';
import Histogram from '../components/histogram';

const maxBlocksForLabels = 23;

class StatisticsCard extends Component {
  render() {
    const blockData = randomHistogram();
    const showLabels = blockData.length < maxBlocksForLabels;

    return (
      <ContentCard>
        <h1>Statistics</h1>
        <Histogram data={blockData} nameKey="blockName" keyList={["blockSize1", "blockSize2"]} width={800} height={500} showLabels={showLabels} />
      </ContentCard>
    );
  }
}

export default StatisticsCard;
