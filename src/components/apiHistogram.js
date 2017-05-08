import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Histogram from './histogram';
import { fetchStatsActions } from '../actions/apiActions';


class APIHistogram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      histogramData: []
    };
  }

  componentDidMount() {
    this.props[this.props.fetchKey]();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stats) {
      this.setState({
        histogramData: this.props.convertStats(nextProps.stats)
      });
    }
  }

  render() {
    return (
      <Histogram
        data={this.state.histogramData}
        keyList={this.props.keyList}
        nameKey={'x'}
        showLabels={this.props.showLabels}
      />
    );
  }
}

APIHistogram.propTypes = {
  keyList: PropTypes.array.isRequired,
  convertStats: PropTypes.func.isRequired,
  fetchKey: PropTypes.string.isRequired,
  showLabels: PropTypes.bool
};

APIHistogram.defaultProps = {
  showLabels: false
};

/* connection to Redux */
function mapStateToProps(state) {
  return {
    stats: state.api[state.api.typeFetched],
    error: state.api.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(fetchStatsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(APIHistogram);
