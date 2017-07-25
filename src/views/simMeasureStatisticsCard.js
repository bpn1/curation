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
import { sizeMe } from 'react-sizeme';

import ContentCard from '../components/contentCard';
import SimilarityHistogram from '../components/similarityHistogram';

class StatisticsCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    const titleSize = 60;
    return (
      <ContentCard>
        <h1>Similarity Measure Statistics</h1>
        <SimilarityHistogram height={this.props.size.height - titleSize - topAndBottomPadding} />
      </ContentCard>
    );
  }
}

StatisticsCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired
};

export default sizeMe({ monitorHeight: true })(StatisticsCard);
