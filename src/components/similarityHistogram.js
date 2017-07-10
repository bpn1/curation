import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getDateFromTimeUUID from '../helpers/timeUUIDParser';
import APIHistogram from './apiHistogram';

const DATA_KEYS = ['fscore', 'recall', 'precision'];

class SimilarityHistogram extends Component {
  render() {
    return (
      <APIHistogram
        type="similarity"
        height={this.props.height}
        domain={[0, 1]}
        keyList={DATA_KEYS}
        filterKeys={DATA_KEYS}
        fetchIdKey={'fetchSimMeasureStatsIds'}
        fetchDataKey={'fetchSimMeasureData'}
        primaryKeys={['id']}
        renderDropDownText={stat => stat.comment + ': ' + getDateFromTimeUUID(stat.id).toLocaleString()}
        nameKey={'threshold'}
      />
    );
  }
}


SimilarityHistogram.propTypes = {
  height: PropTypes.number.isRequired
};

export default SimilarityHistogram;
