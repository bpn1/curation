import React from 'react';
import PropTypes from 'prop-types';

import Histogram from './histogram';

const BlockHistogram = ({ width = 400, height = 400 }) => { // data, nameKey, keyList, showLabels = true
  let histogramData = {}; // TODO fetch using Redux-connected subcomponent (see #67)
  let dataKeys = ["blockSize1", "blockSize2"]; // TODO generate or fetch from Redux (see above)

  return (
    <Histogram data={histogramData} keyList={dataKeys} width={width} height={height} />
  )
};

Histogram.propTypes = {
  data: PropTypes.array.isRequired,
  keyList: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  showLabels: PropTypes.bool
};

export default BlockHistogram;
