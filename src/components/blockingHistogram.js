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
        dropDownText={stat =>
          stat.comment.replace('Blocking', '').replace(';', '')
          + ' ' + stat.schemetag + ': '
          + (stat.comparisoncount ? ('CC: ' + stat.comparisoncount + ', ') : '')
          + (stat.pairscompleteness ? ('PC: ' + stat.pairscompleteness + ', ') : '')
          + (stat.blockcount ? ('BC: ' + stat.blockcount + ', ') : '')
          + getDateFromTimeUUID(stat.jobid).toLocaleString()}
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
