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

import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from 'recharts/es6/component/ResponsiveContainer';
import LineChart from 'recharts/es6/chart/LineChart';
import CartesianGrid from 'recharts/es6/cartesian/CartesianGrid';
import XAxis from 'recharts/es6/cartesian/XAxis';
import YAxis from 'recharts/es6/cartesian/YAxis';
import Tooltip from 'recharts/es6/component/Tooltip';
import Line from 'recharts/es6/cartesian/Line';
import Legend from 'recharts/es6/component/Legend';

const lineColors = ['#F44336', '#2196F3', '#FF9800', '#9C27B0'];
const darkStrokeColor='#555';
const lightStrokeColor='#ccc';
const Histogram = ({ data, nameKey, keyList, height, domain, xLabel, yLabel, showLabels, showGrid, showDots }) => (
  <ResponsiveContainer height={height}>
    <LineChart
      data={data}
      margin={{ top: 20, right: 80, left: 10, bottom: 0 }}
    >
      { showGrid && <CartesianGrid stroke={lightStrokeColor} strokeDasharray="3 3" /> }
      <XAxis label={xLabel} dataKey={nameKey} />
      <YAxis label={yLabel} domain={domain} />
      <Tooltip labelStyle={{ color: '#000' }} label="" />
      <Legend verticalAlign="bottom" height={36} />
      {
        keyList.map((dataKey, i) => {
          const label = showLabels ? { fill: lineColor, fontSize: 20, dy: -10, textAnchor: 'middle' } : false;
          return (
            <Line
              type="linear"
              key={dataKey}
              dataKey={dataKey}
              stroke={lineColors[i]}
              dot={showDots}
              yAxisId={0}
              label={label}
            />
          );
        })
      }
    </LineChart>
  </ResponsiveContainer>
);

Histogram.defaultProps = {
  showLabels: true,
  showGrid: true,
  showDots: true,
  xLabel: '',
  yLabel: '',
};

Histogram.propTypes = {
  data: PropTypes.array.isRequired,
  keyList: PropTypes.array.isRequired,
  nameKey: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  domain: PropTypes.array.isRequired,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  showDots: PropTypes.bool,
  showLabels: PropTypes.bool,
  showGrid: PropTypes.bool
};

export default Histogram;
