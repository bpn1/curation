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
  left: PropTypes.element,
  middle: PropTypes.element,
  right: PropTypes.element,
  showMiddle: PropTypes.bool
};

HeadBar.defaultProps = {
  left: null,
  middle: null,
  right: null,
  showMiddle: false
};

export default muiThemable()(HeadBar);
