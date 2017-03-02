import React, { Component } from 'react';
import muiThemable from 'material-ui/styles/muiThemeable';

import styles from './headbar.css';

class HeadBar extends Component {
  render() {
    const showMiddle = this.props.showMiddle;

    const headerStyle = {
      backgroundColor: this.props.muiTheme.palette.primary2Color,
      color: this.props.muiTheme.palette.textColor
    };

    return (
      <header className={styles.appHeader} style={headerStyle}>
        <div className={styles.container}>
          <div className={showMiddle ? styles.leftSection : styles.leftSectionOnly} >
            <div className={styles.title}>
              {this.props.left}
            </div>
          </div>
          {showMiddle &&
            <div className={styles.middleSection}>
              {this.props.middle}
            </div>}
          <div className={showMiddle ? styles.rightSection : styles.rightSectionOnly} >
            <span className={styles.rightContent}>
              {this.props.right}
            </span>
          </div>
        </div>
      </header>);
  }
}

HeadBar.propTypes = {
  left: React.PropTypes.element,
  middle: React.PropTypes.element,
  right: React.PropTypes.element,
  showMiddle: React.PropTypes.bool
};

HeadBar.defaultProps = {
  left: null,
  middle: null,
  right: null,
  showMiddle: false
};

export default muiThemable()(HeadBar);
