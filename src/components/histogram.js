import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

// from: http://stackoverflow.com/a/7638362
function randomColor() {
  let c = '';
  while (c.length < 6) {
    c += (Math.random()).toString(16).substr(-6).substr(-1);
  }
  return '#' + c;
}
const lineColors = ['#F44336', '#2196F3', '#FF9800', '#9C27B0'];
const Histogram = ({ data, nameKey, keyList, showLabels, showGrid }) => (
  <ResponsiveContainer aspect={3}>
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
              dot={false}
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
  showGrid: true
};

Histogram.propTypes = {
  data: PropTypes.array.isRequired,
  keyList: PropTypes.array.isRequired,
  nameKey: PropTypes.string.isRequired,
  showLabels: PropTypes.bool,
  showGrid: PropTypes.bool
};

export default Histogram;
