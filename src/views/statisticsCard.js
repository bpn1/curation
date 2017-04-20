import React, { Component } from 'react';
import ContentCard from '../components/content_card';
import Histogram from '../components/histogram';

class StatisticsCard extends Component {
  render() {
    const blockData = [
      {blockName: "Hel", blockSize1: 666, blockSize2: 765},
      {blockName: "Hul", blockSize1: 633, blockSize2: 723},
      {blockName: "Hol", blockSize1: 600, blockSize2: 689},
      {blockName: "Hal", blockSize1: 333, blockSize2: 642},
      {blockName: "Was", blockSize1: 123, blockSize2: 222},
      {blockName: "Los", blockSize1: 2,   blockSize2: 1}
    ];

    return (
      <ContentCard>
        <h1>Statistics</h1>
        <Histogram data={blockData} nameKey="blockName" dataKey="blockSize1" width={800} height={500}/>
      </ContentCard>
    );
  }
}

export default StatisticsCard;
