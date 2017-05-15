import React, { Component } from 'react';

import getDateFromTimeUUID from '../helpers/timeUUIDParser';
import APIHistogram from './apiHistogram';

const DATA_KEYS = ['fscore', 'recall', 'precision'];

class SimilarityHistogram extends Component {
  render() {
    return (
      <APIHistogram
        type="similarity"
        keyList={DATA_KEYS}
        fetchIdKey={'fetchSimMeasureStatsIds'}
        fetchDataKey={'fetchSimMeasureData'}
        primaryKeys={['id']}
        dropDownText={stat => stat.comment + ': ' + getDateFromTimeUUID(stat.id).toLocaleString()}
        nameKey={'threshold'}
      />
    );
  }
}

export default SimilarityHistogram;
