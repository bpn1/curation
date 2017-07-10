import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getDateFromTimeUUID from '../helpers/timeUUIDParser';
import APIHistogram from './apiHistogram';

const DATA_KEYS = ['numsubjects', 'numstaging', 'comparisons'];

class BlockingHistogram extends Component {
  render() {
    return (
      <APIHistogram
        type="blocking"
        height={this.props.height}
        keyList={DATA_KEYS}
        filterKeys={['comparisons']}
        fetchIdKey={'fetchBlockingStatsIds'}
        fetchDataKey={'fetchBlockingStatsData'}
        primaryKeys={['jobid', 'schemetag']}
        renderDropDownText={stat =>
          stat.comment.replace('Blocking', '').replace(';', '')
          + ' ' + stat.schemetag + ': '
          + getDateFromTimeUUID(stat.jobid).toLocaleString()}
        renderMenuItem={stat =>
          (stat.comparisoncount ? ('Comparison Count: ' + stat.comparisoncount + ', ') : '')
          + (stat.pairscompleteness ? ('Pairs Completeness: ' + stat.pairscompleteness + ', ') : '')
          + (stat.blockcount ? ('Block Count: ' + stat.blockcount) : '')}
        nameKey={'key'}
        min={1000}
      />
    );
  }
}

BlockingHistogram.propTypes = {
  height: PropTypes.number.isRequired
};

export default BlockingHistogram;
