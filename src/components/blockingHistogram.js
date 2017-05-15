import React, { Component } from 'react';

import APIHistogram from './apiHistogram';

const DATA_KEYS = ['numsubjects', 'numstaging'];

function convertStats(stats) {
  // TODO optimize so we do not need to filter
  return stats//.slice(3000, 5000)
    .filter(entry => entry.numsubjects > 10 && entry.numstaging > 10)
    .sort((a, b) => {
      const aVal = a.numsubjects * a.numstaging;
      const bVal = b.numsubjects * b.numstaging;
      return ((aVal > bVal) ? 1 : ((bVal > aVal) ? -1 : 0)) * -1; // descending sort
    });
  //   && entry.numsubjects < 400 && entry.numstaging < 400);
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
