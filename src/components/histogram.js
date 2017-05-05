import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import PropTypes from 'prop-types';

// from: http://stackoverflow.com/a/7638362
function randomColor() {
  let c = '';
  while (c.length < 6) {
    c += (Math.random()).toString(16).substr(-6).substr(-1)
  }
  return '#'+c;
}

const Histogram = ({ data, nameKey, keyList, width = 400, height = 400, showLabels = true, showGrid = true }) => {
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top:5, right: 20, left: 10, bottom: 5 }}>
      { showGrid ? <CartesianGrid stroke="#555" strokeDasharray="3 3" /> : "" }
      <XAxis dataKey={nameKey} />
      <YAxis />
      <Tooltip label="" />
      {
        keyList.map(dataKey => {
          const lineColor = randomColor();
          const label = showLabels ? { fill: lineColor, fontSize: 20, dy: -10, textAnchor: "middle" } : false;
          return <Line type="monotone" key={dataKey} dataKey={dataKey} stroke={lineColor} yAxisId={0} legendType="diamond" label={label} />
        })
      }
    </LineChart>
  )
};

Histogram.propTypes = {
  data: PropTypes.array.isRequired,
  keyList: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  showLabels: PropTypes.bool,
  showGrid: PropTypes.bool
};

export default Histogram;
