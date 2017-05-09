import React, { Component } from 'react';

import APIHistogram from './apiHistogram';

const DATA_KEYS = ['f1Score', 'recall', 'precision'];

function convertStats(stats) {
  return stats
    .sort((a, b) => (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0))
    .map(entry => ({
      x: entry[0],
      f1Score: entry[1],
      recall: entry[2],
      precision: entry[3],
    }));
}

class SimilarityHistogram extends Component {
  render() {
    return (
      <APIHistogram
        keyList={DATA_KEYS}
        fetchKey={'fetchSimMeasureStats'}
        convertStats={convertStats}
        nameKey={'x'}
      />
    );
  }
}

export default SimilarityHistogram;
