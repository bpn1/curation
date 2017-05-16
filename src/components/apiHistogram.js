import React, {Component} from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import {DropDownMenu, MenuItem} from 'material-ui/DropDownMenu';
import {Checkbox, TextField} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid';

import Histogram from './histogram';
import {fetchStatsActions} from '../actions/apiActions';

class APIHistogram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      histogramData: [],
      filteredHistogramData: [],
      excludeFilter: [],
      showDots: false,
      min: 15,
      keyList: props.keyList
    };
  }

  componentDidMount() {
    this.props[this.props.fetchIdKey]();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statsData && this.state.histogramId) {
      this.setState({
        histogramData: nextProps.statsData[this.histogramIdToKey(this.state.histogramId)],
        filteredHistogramData: this.filterHistogramData(nextProps.statsData[this.histogramIdToKey(this.state.histogramId)], this.state.max, this.state.min, this.state.excludeFilter)
      });
    } else if (nextProps.statsIds) {
      const firstStatsEntry = nextProps.statsIds[1]; // TODO select first item
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
        histogramData: this.props.statsData[this.histogramIdToKey(histogramId)],
        filteredHistogramData: this.filterHistogramData(this.props.statsData[this.histogramIdToKey(this.state.histogramId)], this.state.max, this.state.min, this.state.excludeFilter)
      });
    } else {
      this.props[this.props.fetchDataKey](histogramId);
    }
  }

  onDropDownChange = (event, index, value) => {
    this.setState({histogramId: this.keyToHistogramId(value)});
    this.fetchStatsData(this.keyToHistogramId(value));
  };

  onExcludeFilterChange = (event, newValue) => {
    const excludes = newValue.replace(/ /g, '').toLowerCase().split(',');
    this.setState({
      excludeFilter: excludes,
    });
    this.filterHistogramData(this.state.histogramData, this.state.max, this.state.min, excludes);
  };

  onMinFilterChange = (event, newValue) => {
    this.setState({
      min: Number(newValue),
    });
    this.filterHistogramData(this.state.histogramData, this.state.max, Number(newValue), this.state.excludeFilter);
  };

  onMaxFilterChange = (event, newValue) => {
    this.setState({
      max: Number(newValue),
    });
    this.filterHistogramData(this.state.histogramData, Number(newValue), this.state.min, this.state.excludeFilter);
  };

  filterHistogramData = (histogramData, max, min, excludes) => {
    const filteredData = histogramData
      .filter(entry => excludes.indexOf(entry[this.props.nameKey].toLowerCase()) === -1
      && this.filterMinMax(entry, min, max));
    this.setState({
      filteredHistogramData: filteredData
    });
    return filteredData; // TODO return OR setState
  };

  filterMinMax = (entry, min, max) => {
    return this.props.keyList.every(function (key) {
      return !(entry[key] < min || entry[key] > max);
    });
  };

  histogramIdToKey(histogramId) {
    return histogramId ? histogramId.join('+') : histogramId;
  }

  keyToHistogramId(key) {
    return key ? key.split('+') : key;
  }

  render() {
    console.log(this.state.filteredHistogramData)
    return (
      <Grid fluid>
        <Row middle="xs">
          <Col xs={4}>
            <DropDownMenu
              autoWidth
              value={this.histogramIdToKey(this.state.histogramId)}
              onChange={this.onDropDownChange}>
              {
                this.props.statsIds !== undefined
                && this.props.statsIds.map(function (stat, i) {
                  return <MenuItem
                    key={'stats_' + i}
                    value={this.histogramIdToKey(this.props.primaryKeys.map((primaryKey) => stat[primaryKey]))}
                    primaryText={this.props.dropDownText(stat)}/>
                }.bind(this))
              }
            </DropDownMenu>
          </Col>
          <Col xs={2}>
            <Checkbox label="Show Dots"
                      defaultChecked={false}
                      value={this.state.showDots}
                      onCheck={(event, isInputChecked) => this.setState({showDots: isInputChecked})}/>
          </Col>
          <Col xs={2}>
            <TextField
              hintText="Minimum value"
              floatingLabelText="Minimum"
              value={this.state.min}
              onChange={this.onMinFilterChange}
            />
          </Col>
          <Col xs={2}>
            <TextField
              hintText="Maximum value"
              floatingLabelText="Maximum"
              value={this.state.max}
              onChange={this.onMaxFilterChange}
            />
          </Col>
          <Col xs={2}>
            <TextField
              hintText="Values seperated by ,"
              floatingLabelText="Excluded values"
              onChange={this.onExcludeFilterChange}
            />
          </Col>
        </Row>
        <Row>
          <Histogram
            data={this.state.filteredHistogramData}
            keyList={this.state.keyList}
            nameKey={this.props.nameKey}
            showLabels={this.props.showLabels}
            showDots={this.state.showDots}
          />
        </Row>
      </Grid>
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
