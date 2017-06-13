import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import ForwardArrowIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import BackArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';

class DirectionToggle extends Component {
  constructor(props) {
    super(props);
    const isForward = props.meta.initial;
    this.state = { isForward };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    const isForward = !this.state.isForward;
    this.props.input.onChange(isForward);
    this.setState({ isForward });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.hasOwnProperty('value') && nextProps.input.value !== null) {
      this.setState({ isForward: nextProps.input.value });
    }
  }

  render() {
    return (
      <IconButton
        onClick={this.handleClick}
        tooltip="Invert relation"
        touch
        tooltipPosition={this.props.tooltipPosition}
      >
        { this.state.isForward ?
          <ForwardArrowIcon
            color={this.props.normalColor}
            hoverColor={this.props.hoverColor}
          /> :
          <BackArrowIcon
            color={this.props.normalColor}
            hoverColor={this.props.hoverColor}
          />
        }
      </IconButton>
    );
  }
}

DirectionToggle.PropTypes = {
  input: PropTypes.shape({
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.object,
  normalColor: PropTypes.string,
  hoverColor: PropTypes.string,
  tooltipPosition: PropTypes.string
};

DirectionToggle.defaultProps = {
  meta: {
    initial: true
  },
  normalColor: '#666',
  hoverColor: '#aaa',
  tooltipPosition: 'top-right'
};

export default DirectionToggle;
