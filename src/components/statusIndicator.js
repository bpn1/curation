/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import IconButton from 'material-ui/IconButton';
import muiThemable from 'material-ui/styles/muiThemeable';

import ErrorIcon from 'material-ui/svg-icons/alert/error';
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
    if (nextProps.status) { this.setState({ status: nextProps.status }); }

    if (nextProps.error) { this.setState({ error: nextProps.error }); }
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  hasErrorMessage() {
    return this.state.error !== undefined;
  }

  handleClick = (evt) => {
    if (this.hasErrorMessage()) { console.warn('Redux Error: ', this.state.error); }
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
    const formattedError = hasErrorMessage ? Object.values(error).map(v => v && <div key={v}>{v}</div>) : '';
    const tooltipPosition = hasErrorMessage ? 'bottom-left' : 'bottom-center';

    return (
      <IconButton
        tooltip={formattedError}
        touch
        onClick={this.handleClick}
        tooltipPosition={tooltipPosition}
        style={this.iconButtonStyle}
      >
        {iconVisible.ok && <OkIcon color={iconColors.ok[0]} hoverColor={iconColors.ok[1]} />}
        {iconVisible.warning && <WarningIcon color={iconColors.warning[0]} hoverColor={iconColors.warning[1]} />}
        {iconVisible.error && <ErrorIcon color={iconColors.error[0]} hoverColor={iconColors.error[1]} />}
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
  return {
    status: {
      ...state.duplicate.status,
      ...state.subject.status,
      ...state.linkedArticles.status,
      ...state.versiondiff.status
    },
    error: {
      ...state.duplicate.error,
      ...state.subject.error,
      ...state.linkedArticles.error,
      ...state.versiondiff.error
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemable()(StatusIndicator));
