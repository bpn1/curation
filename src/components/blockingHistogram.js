/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
