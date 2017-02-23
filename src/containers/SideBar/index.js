import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionInfo from 'material-ui/svg-icons/action/info';

import toggleSideNav from '../../actions/index';
import styles from './sidebar.css';
import { layoutBreakpoint } from '../../layout';
import image from '../../images/kolage.jpg';


class SideBar extends Component {
  render() {
    // responsive sidebar styling
    const sideBarStyle = window.matchMedia(layoutBreakpoint).matches ?
                                    { top: 'auto', position: 'relative', width: '100%', boxShadow: 'none' } :
                                    { position: 'absolute', top: 'auto', boxShadow: 'none' };
    const overlayClass = !window.matchMedia(layoutBreakpoint).matches && this.props.showSideNav ?
                                    styles.shadowedOverlay : styles.transparentOverlay;
    return (
      <div className={styles.sidebarWrapper}>
        <div className={overlayClass} onClick={() => this.props.toggleSideNav()} />
        <Drawer
          docked
          open={this.props.showSideNav}
          className={this.props.showSideNav && window.matchMedia(layoutBreakpoint).matches ? // The sidebar should not
              styles.sideBarOpen : styles.sideBarClosed} // take any width in parent container on mobile devices
          containerClassName={styles.sideNav}
          containerStyle={sideBarStyle}
        >
          { !window.matchMedia(layoutBreakpoint).matches &&
            <div className={styles.avatarContainer}> <Avatar size={80} src={image} /> </div> }
          <List onClick={window.matchMedia(layoutBreakpoint).matches ? () => {} : () => this.props.toggleSideNav()}>
            <ListItem primaryText="Services" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Tasks" leftIcon={<ActionGrade />} />
            <ListItem primaryText="Data" leftIcon={<ContentSend />} />
            <ListItem primaryText="Models" leftIcon={<ContentDrafts />} />
          </List>
          <Divider className={styles.sideDivider} />
          <List onClick={window.matchMedia(layoutBreakpoint).matches ? () => {} : () => this.props.toggleSideNav()} >
            <ListItem primaryText="Settings" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Info" rightIcon={<ActionInfo />} />
          </List>
        </Drawer>
      </div>
    );
  }
}

SideBar.propTypes = {
  showSideNav: React.PropTypes.bool.isRequired,
  toggleSideNav: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    showSideNav: state.showSideNav
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleSideNav: toggleSideNav }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
