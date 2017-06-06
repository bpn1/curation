import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from 'recharts/es6/component/ResponsiveContainer';
import LineChart from 'recharts/es6/chart/LineChart';
import CartesianGrid from 'recharts/es6/cartesian/CartesianGrid';
import XAxis from 'recharts/es6/cartesian/XAxis';
import YAxis from 'recharts/es6/cartesian/YAxis';
import Tooltip from 'recharts/es6/component/Tooltip';
import Line from 'recharts/es6/cartesian/Line';

// from: http://stackoverflow.com/a/7638362
function randomColor() {
  let c = '';
  while (c.length < 6) {
    c += (Math.random()).toString(16).substr(-6).substr(-1);
  }
  return '#' + c;
}
const lineColors = ['#F44336', '#2196F3', '#FF9800', '#9C27B0'];
const Histogram = ({ data, nameKey, keyList, height, showLabels, showGrid, showDots }) => (
  <ResponsiveContainer height={height}>
    <LineChart
      data={data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      { showGrid ? <CartesianGrid stroke="#555" strokeDasharray="3 3" /> : '' }
      <XAxis dataKey={nameKey} />
      <YAxis />
      <Tooltip labelStyle={{ color: '#000' }} label="" />
      {
        keyList.map((dataKey, i) => {
          const label = showLabels ? { fill: lineColor, fontSize: 20, dy: -10, textAnchor: 'middle' } : false;
          return (
            <Line
              type="monotone"
              key={dataKey}
              dataKey={dataKey}
              stroke={lineColors[i]}
              dot={showDots}
              yAxisId={0}
              legendType="diamond"
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
  showDots: true
};

Histogram.propTypes = {
  data: PropTypes.array.isRequired,
  keyList: PropTypes.array.isRequired,
  nameKey: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  showDots: PropTypes.bool,
  showLabels: PropTypes.bool,
  showGrid: PropTypes.bool
};

export default Histogram;
