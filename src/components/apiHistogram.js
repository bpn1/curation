import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import { DropDownMenu, MenuItem } from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ChipInput from 'material-ui-chip-input';

import Histogram from './histogram';
import { fetchStatsActions } from '../actions/apiActions';

class APIHistogram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      histogramData: [],
      filteredHistogramData: [],
      excludeFilter: [],
      showDots: false,
      min: props.min,
      max: props.max,
      keyList: props.keyList
    };
  }

  componentDidMount() {
    this.props[this.props.fetchIdKey]();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statsData && this.state.histogramId) {
      const histogramKey = this.histogramIdToKey(this.state.histogramId);
      this.filterHistogramData(nextProps.statsData[histogramKey],
        this.state.max, this.state.min, this.state.excludeFilter);
      this.setState({
        xLabel: nextProps.xLabel[histogramKey],
        yLabel: nextProps.yLabel[histogramKey],
      });
    } else if (nextProps.statsIds) {
      const firstStatsEntry = nextProps.statsIds[0];
      const histogramId = nextProps.primaryKeys.map(primaryKey => firstStatsEntry[primaryKey]);
      this.setState({
        histogramId: histogramId,
      });
      this.props[this.props.fetchDataKey](histogramId);
    }
  }

  onDropDownChange = (event, index, value) => {
    this.setState({
      histogramId: this.keyToHistogramId(value),
      xLabel: this.props.xLabel[value],
      yLabel: this.props.yLabel[value],
    });
    this.fetchStatsData(this.keyToHistogramId(value));
  };

  onExcludeFilterChange = (newValue) => {
    this.setState({
      excludeFilter: newValue,
    });
    this.filterHistogramData(this.state.histogramData, this.state.max, this.state.min, newValue);
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

  // fetches only if statsdata is not already in redux state
  fetchStatsData(histogramId) {
    if (this.props.statsData && this.histogramIdToKey(histogramId) in this.props.statsData) {
      this.filterHistogramData(this.props.statsData[this.histogramIdToKey(histogramId)],
        this.state.max, this.state.min, this.state.excludeFilter);
    } else {
      this.props[this.props.fetchDataKey](histogramId);
    }
  }

  filterHistogramData = (histogramData, max, min, excludes) => {
    const filteredData = histogramData
      .filter(entry => excludes.indexOf(entry[this.props.nameKey].toString().toLowerCase()) === -1
        && this.filterMinMax(entry, min, max));
    this.setState({
      histogramData: histogramData,
      filteredHistogramData: filteredData
    });
  };

  filterMinMax = (entry, min, max) => this.props.filterKeys.every(function (key) {
    return !(entry[key] < min || entry[key] > max);
  });

  histogramIdToKey(histogramId) {
    return histogramId ? histogramId.join('+') : histogramId;
  }

  keyToHistogramId(key) {
    return key ? key.split('+') : key;
  }

  render() {
    const optionsBarHeight = 86;
    return (
      <Grid fluid>
        <Row middle="xs">
          <Col xs={12} sm={8} lg={6}>
            <DropDownMenu
              autoWidth
              value={this.histogramIdToKey(this.state.histogramId)}
              onChange={this.onDropDownChange}
              selectedMenuItemStyle={{ fontWeight: '500' }}
            >
              {
                this.props.statsIds !== undefined
                && this.props.statsIds.map(function (stat, i) {
                  return (<MenuItem
                    key={'stats_' + i}
                    value={this.histogramIdToKey(this.props.primaryKeys.map(primaryKey => stat[primaryKey]))}
                    primaryText={this.props.renderDropDownText(stat)}
                  >{this.props.renderMenuItem(stat)}</MenuItem>);
                }.bind(this))
              }
            </DropDownMenu>
          </Col>
          <Col xs={12} sm={4} lg={1}>
            <Checkbox
              label="Dots"
              defaultChecked={false}
              value={this.state.showDots}
              onCheck={(event, isInputChecked) => this.setState({ showDots: isInputChecked })}
            />
          </Col>
          <Col xs={12} md={8} lg={3}>
            <ChipInput
              defaultValue={[]}
              onChange={chips => this.onExcludeFilterChange(chips)}
              fullWidth
              floatingLabelText="Excluded values"
            />
          </Col>
          <Col xs={6} md={2} lg={1}>
            <TextField
              fullWidth
              type="number"
              hintText="Minimum value"
              floatingLabelText="Minimum"
              value={this.state.min}
              onChange={this.onMinFilterChange}
            />
          </Col>
          <Col xs={6} md={2} lg={1}>
            <TextField
              fullWidth
              type="number"
              hintText="Maximum value"
              floatingLabelText="Maximum"
              value={this.state.max}
              onChange={this.onMaxFilterChange}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Histogram
              height={this.props.height - optionsBarHeight}
              data={this.state.filteredHistogramData}
              xLabel={this.state.xLabel}
              yLabel={this.state.yLabel}
              domain={this.props.domain}
              keyList={this.state.keyList}
              nameKey={this.props.nameKey}
              showLabels={this.props.showLabels}
              showDots={this.state.showDots}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

APIHistogram.propTypes = {
  keyList: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  filterKeys: PropTypes.array.isRequired,
  fetchIdKey: PropTypes.string.isRequired,
  fetchDataKey: PropTypes.string.isRequired,
  nameKey: PropTypes.string.isRequired,
  primaryKeys: PropTypes.array.isRequired,
  renderDropDownText: PropTypes.func.isRequired,
  renderMenuItem: PropTypes.func,
  domain: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number,
  showLabels: PropTypes.bool
};

APIHistogram.defaultProps = {
  showLabels: false,
  domain: [0, 'auto'],
  renderMenuItem: () => ''
};

/* connection to Redux */
function mapStateToProps(state, ownProps) {
  return {
    statsData: state.api.stats[ownProps.type],
    xLabel: state.api.xAxis[ownProps.type],
    yLabel: state.api.yAxis[ownProps.type],
    statsIds: state.api.statsIds[ownProps.type],
    error: state.api.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(fetchStatsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(APIHistogram);
