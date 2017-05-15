import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropDownMenu, MenuItem } from 'material-ui';

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
    this.props[this.props.fetchIdKey]();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statsData && this.state.histogramId) {
      this.setState({
        histogramData: nextProps.statsData[this.histogramIdToKey(this.state.histogramId)]
      });
    } else if (nextProps.statsIds) {
      const firstStatsEntry = nextProps.statsIds[0];
      const histogramId = nextProps.primaryKeys.map((primaryKey) => firstStatsEntry[primaryKey]);
      this.setState({
        histogramId: histogramId
      });
      this.props[this.props.fetchDataKey](histogramId);
    }
  }

  // fetches only if statsdata is not already in redux state
  fetchStatsData(histogramId) {
    if (this.props.statsData && this.histogramIdToKey(histogramId) in this.props.statsData) {
      this.setState({
        histogramData: this.props.statsData[this.histogramIdToKey(histogramId)]
      });
    } else {
      this.props[this.props.fetchDataKey](histogramId);
    }
  }

  handleChange = (event, index, value) => {
    this.setState({ histogramId: this.keyToHistogramId(value) });
    this.fetchStatsData(this.keyToHistogramId(value));
  };

  histogramIdToKey(histogramId) {
    return histogramId ? histogramId.join('+') : histogramId;
  }
  keyToHistogramId(key) {
    return key ? key.split('+') : key;
  }

  render() {
    return (
      <div>
        <DropDownMenu
          autoWidth
          value={this.histogramIdToKey(this.state.histogramId)}
          onChange={this.handleChange}>
          {
            this.props.statsIds !== undefined
            && this.props.statsIds.map(function (stat, i) {
              return <MenuItem
                key={'stats_' + i}
                value={this.histogramIdToKey(this.props.primaryKeys.map((primaryKey) => stat[primaryKey]))}
                primaryText={this.props.dropDownText(stat)} />
            }.bind(this))
          }
        </DropDownMenu>
        <Histogram
          data={this.state.histogramData}
          keyList={this.props.keyList}
          nameKey={this.props.nameKey}
          showLabels={this.props.showLabels}
        />
      </div>
    );
  }
}

APIHistogram.propTypes = {
  type: PropTypes.string.isRequired,
  keyList: PropTypes.array.isRequired,
  fetchIdKey: PropTypes.string.isRequired,
  fetchDataKey: PropTypes.string.isRequired,
  nameKey: PropTypes.string.isRequired,
  primaryKeys: PropTypes.array.isRequired,
  dropDownText: PropTypes.func.isRequired,
  showLabels: PropTypes.bool
};

APIHistogram.defaultProps = {
  showLabels: false
};

/* connection to Redux */
function mapStateToProps(state, ownProps) {
  return {
    statsData: state.api.stats[ownProps.type],
    statsIds: state.api.statsIds[ownProps.type],
    error: state.api.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(fetchStatsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(APIHistogram);
