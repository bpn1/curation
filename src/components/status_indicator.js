import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';

import IconButton from 'material-ui/IconButton';
import muiThemable from 'material-ui/styles/muiThemeable';

import ErrorIcon from 'material-ui/svg-icons/alert/error'; // TODO without -outline?
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import OkIcon from 'material-ui/svg-icons/navigation/check';

class StatusIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.status,
      error: props.error
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status)
      this.setState({ status: nextProps.status });

    if (nextProps.error)
      this.setState({ error: nextProps.error });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  hasErrorMessage() {
    return this.state.error !== undefined;
  }

  handleClick = (evt) => {
    if (this.hasErrorMessage())
      console.warn("Redux Error: ", this.state.error);
  };

  render() {
    const colors = this.props.muiTheme.palette;

    const iconColors = {
      ok: [colors.positiveColor1, colors.positiveColor2],
      warning: [colors.interactiveColor1, colors.interactiveColor2],
      error: [colors.negativeColor1, colors.negativeColor2]
    };

    const iconVisible = {
      ok: Object.values(this.state.status).every(v => v !== 'ERROR' && v !== 'warning'),
      warning: Object.values(this.state.status).some(v => v === 'warning'),
      error: Object.values(this.state.status).some(v => v === 'error' || v === 'ERROR')
    };

    const { error } = this.state;
    const hasErrorMessage = this.hasErrorMessage();
    const formattedError = hasErrorMessage ? Object.values(error).map(v => v && <div key={v}>{v}</div>) : "";
    const tooltipPosition = hasErrorMessage ? "top-left" : "top-center";
    const tooltip = formattedError;

    // TODO show dialog/ popup onClick

    return (
      <IconButton
        tooltip={tooltip}
        touch={true}
        onClick={this.handleClick}
        tooltipPosition={tooltipPosition}
        style={this.iconButtonStyle}>
        {iconVisible.ok && <OkIcon color={iconColors.ok[0]} hoverColor={iconColors.ok[1]}/>}
        {iconVisible.warning && <WarningIcon color={iconColors.warning[0]} hoverColor={iconColors.warning[1]}/>}
        {iconVisible.error && <ErrorIcon color={iconColors.error[0]} hoverColor={iconColors.error[1]}/>}
      </IconButton>
    );
  }
}

StatusIndicator.propTypes = {
  status: PropTypes.object,
  error: PropTypes.object
};

StatusIndicator.defaultProps = {
  status: { initialStatus: 'ok' },
  error: undefined
};

/* connection to Redux */
function mapStateToProps(state) {
  return {  // TODO better way to use multiple reducers/stores
    // TODO change to a different reducer later (controllable from other reducers)?
    status: { ...state.duplicate.status, ...state.subject.status, ...state.graph.status },
    error: { ...state.duplicate.error, ...state.subject.error, ...state.graph.error }
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemable()(StatusIndicator));
