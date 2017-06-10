import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';

const changeCountStyle = {
  marginRight: 8,
  fontSize: 20,
  fontWeight: 'normal'
};


class IconCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <span>
        <FontIcon className="material-icons" color={this.props.color}>add</FontIcon>
        <span style={{ ...changeCountStyle, color: this.props.color }}>10</span>
      </span>
    );
  }
}

export default IconCounter;
