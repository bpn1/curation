import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import ContentInbox from 'material-ui/svg-icons/content/inbox';

import { toggleDetailNav } from '../../actions/index';
import styles from './detailbar.css';
import { layoutBreakpoint } from '../../layout';
import {Link} from "react-router";
import {commerzbankYellow} from "../../themes/curation";
import {grey700} from "material-ui/styles/colors";

class DetailBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetailNav: false,
      content: (<p>There would be details here</p>)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.content) {
      this.setState({
        content: nextProps.content
      });
    }
  }

  render() {
    // responsive sidebar styling
    const sideBarStyle = window.matchMedia(layoutBreakpoint).matches ?
                                    { top: 'auto', position: 'relative', width: '100%', boxShadow: 'none' } :
                                    { position: 'absolute', top: 'auto', boxShadow: 'none' };
    const overlayClass = !window.matchMedia(layoutBreakpoint).matches && this.props.showDetailNav ?
                                    styles.shadowedOverlay : styles.transparentOverlay;
    return (
      <div className={styles.sidebarWrapper}>
        <div className={overlayClass} onClick={() => this.props.toggleDetailNav()} />
        <Drawer
          docked
          openSecondary
          open={this.props.showDetailNav}
          className={this.props.showDetailNav && window.matchMedia(layoutBreakpoint).matches ? // The sidebar should not
              styles.sideBarOpen : styles.sideBarClosed} // take any width in parent container on mobile devices
          containerClassName={styles.sideNav}
          containerStyle={sideBarStyle}>
          <h1 style={{color: commerzbankYellow}}>Detail</h1>
          <Divider />
          { this.state.content }
        </Drawer>
      </div>
    );
  }
}

DetailBar.propTypes = {
  showDetailNav: PropTypes.bool.isRequired,
  toggleDetailNav: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    showDetailNav: state.detailNav.isOpen,
    content: state.detailNav.content
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleDetailNav }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBar);
