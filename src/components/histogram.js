import React, { PropTypes } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';

// from: http://stackoverflow.com/a/7638362
function randomColor() {
  let c = '';
  while (c.length < 6) {
    c += (Math.random()).toString(16).substr(-6).substr(-1)
  }
  return '#'+c;
}

const Histogram = ({ data, nameKey, dataKey, width, height }) => {
  width = width ? width : 400;
  height = height ? height : 400;

  const lineColor = randomColor();

  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top:5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey={nameKey} />
      <YAxis />
      <Tooltip label="" />
      <CartesianGrid stroke="#555" strokeDasharray="3 3" />
      <Line type="monotone" dataKey={dataKey} stroke={lineColor} yAxisId={0} legendType="diamond" label={{ fill: lineColor, fontSize: 20, dy: -10, textAnchor: "middle" }} />
    </LineChart>
  )
};

/*{
  dataKeys.map(function(key, i) {
    return <Line type="monotone" dataKey={key} stroke={randomColor()} yAxisId={i} />;
  })
}*/

Histogram.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Histogram;
