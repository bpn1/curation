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
      error: props.error.toString()
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.status)
      this.setState({ status: nextProps.status });

    if(nextProps.error)
      this.setState({ error: nextProps.error.toString() });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  hasErrorMessage() {
    return this.state.error.hasOwnProperty("length") && this.state.error.length > 0;
  }

  handleClick = (evt) => {
    if(this.hasErrorMessage())
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
      ok: this.state.status === 'ok',
      warning: this.state.status === 'warning',
      error: this.state.status === 'error'
    };

    const error = this.state.error.toString();
    const hasErrorMessage = this.hasErrorMessage();
    const formattedError = hasErrorMessage ? ": " + this.state.error : "";
    const tooltipPosition = hasErrorMessage ? "top-left" : "top-center";
    const tooltip = this.capitalize(this.state.status) + formattedError;

    // TODO show dialog/ popup onClick

    return (
      <IconButton
        tooltip={tooltip}
        touch={true}
        onClick={this.handleClick}
        tooltipPosition={tooltipPosition}
        style={this.iconButtonStyle}>
        { iconVisible.ok ? <OkIcon color={iconColors.ok[0]} hoverColor={iconColors.ok[1]} /> : '' }
        { iconVisible.warning ? <WarningIcon color={iconColors.warning[0]} hoverColor={iconColors.warning[1]} /> : '' }
        { iconVisible.error ? <ErrorIcon color={iconColors.error[0]} hoverColor={iconColors.error[1]} /> : '' }
      </IconButton>
    );
  }
}

StatusIndicator.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string
};

StatusIndicator.defaultProps = {
  status: 'ok',
  error: ''
};

/* connection to Redux */
function mapStateToProps(state) {
  return {
    status: state.api.status, // TODO change to a different reducer later (controllable from different reducers)?
    error: state.api.error
  };
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators({ <ACTION CREATORS> }, dispatch);
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemable()(StatusIndicator));
