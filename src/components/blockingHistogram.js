import React, { Component } from 'react';

import APIHistogram from './apiHistogram';

const DATA_KEYS = ['numsubjects', 'numstaging'];

function convertStats(stats) {
  return stats.slice(3000, 5000) // TODO optimize so we do not need to filter
    .filter(entry => entry.numsubjects > 0 && entry.numstaging > 0 && entry.numsubjects < 400 && entry.numstaging < 400);
}

class BlockingHistogram extends Component {
  render() {
    return (
      <APIHistogram
        keyList={DATA_KEYS}
        fetchKey={'fetchBlockingStats'}
        convertStats={convertStats}
        nameKey={'key'}
      />
    );
  }
}

export default BlockingHistogram;
