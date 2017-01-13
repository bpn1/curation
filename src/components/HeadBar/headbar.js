import React, {Component} from 'react';
import styles from './headbar.css'

class HeadBar extends Component {

  render() {

    const hasSearchBar = this.props.hasSearchBar;

    const barWithSearch = (
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div style={{marginLeft:"20px"}}>
            {this.props.title}
          </div>
        </div>
        <div className={styles.middleSection}>
        </div>
        <div className={styles.rightSection}>
          <span className={styles.rightContent}>
            {this.props.right}
          </span>
        </div>
      </div>);

    const barWithoutSearch = (
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div style={{marginLeft:"20px"}}>
            {this.props.title}
          </div>
        </div>
        <div className={styles.middleSection}>
        </div>
        <div className={styles.rightSection}>
          <span className={styles.rightContent}>
            {this.props.right}
          </span>
        </div>
      </div>);

    if (hasSearchBar) {
      return barWithSearch
    } else {
      return barWithoutSearch
    }
  }
}

export default HeadBar;
