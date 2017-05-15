import React, { Component } from 'react';

import getDateFromTimeUUID from '../helpers/timeUUIDParser';
import APIHistogram from './apiHistogram';

const DATA_KEYS = ['numsubjects', 'numstaging', 'comparision'];

class BlockingHistogram extends Component {
  render() {
    return (
      <APIHistogram
        type="blocking"
        keyList={DATA_KEYS}
        fetchIdKey={'fetchBlockingStatsIds'}
        fetchDataKey={'fetchBlockingStatsData'}
        primaryKeys={['jobid', 'schemetag']}
        dropDownText={stat => stat.comment + ' - ' + stat.schemetag + ': ' + getDateFromTimeUUID(stat.jobid).toLocaleString()}
        nameKey={'key'}
      />
    );
  }
}

export default BlockingHistogram;
