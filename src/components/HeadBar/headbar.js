import React, {Component} from 'react';
import styles from './headbar.css'

class HeadBar extends Component {

  render() {

    const barWithSearch = (
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.title}>
            {this.props.left}
          </div>
        </div>
        <div className={styles.middleSection}>
          {this.props.middle}
        </div>
        <div className={styles.rightSection}>
          <span className={styles.rightContent}>
            {this.props.right}
          </span>
        </div>
      </div>);

    const barWithoutSearch = (
      <div className={styles.container}>
        <div className={styles.leftSectionOnly}>
          <div className={styles.title}>
            {this.props.left}
          </div>
        </div>
        <div className={styles.rightSectionOnly}>
          <span className={styles.rightContent}>
            {this.props.right}
          </span>
        </div>
      </div>);

    if (this.props.showMiddle) {
      return barWithSearch
    } else {
      return barWithoutSearch
    }
  }
}

export default HeadBar;
