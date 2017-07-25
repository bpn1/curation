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
