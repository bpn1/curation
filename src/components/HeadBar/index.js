import React, { Component } from 'react';

import styles from './headbar.css';

class HeadBar extends Component {
  render() {
    const withSearch = this.props.showMiddle;
    return (
      <header className={styles.appHeader}>
        <div className={styles.container}>
          <div className={withSearch ? styles.leftSection : styles.leftSectionOnly} >
            <div className={styles.title}>
              {this.props.left}
            </div>
          </div>
          {withSearch ?
            <div className={styles.middleSection}>
              {this.props.middle}
            </div> : null}
          <div className={withSearch ? styles.rightSection : styles.rightSectionOnly} >
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

export default HeadBar;
