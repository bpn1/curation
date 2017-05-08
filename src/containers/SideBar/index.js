import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAssessment from "material-ui/svg-icons/action/assessment";

import toggleSideNav from '../../actions/index';
import styles from './sidebar.css';
import { layoutBreakpoint } from '../../layout';
import image from '../../../logo.png';
import {Link} from "react-router";
import {commerzbankYellow} from "../../themes/curation";
import {grey700} from "material-ui/styles/colors";


// Function copied from http://www.material-ui.com/#/components/list: Selectable list
function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
          selectedItemStyle={{color: commerzbankYellow, backgroundColor: grey700}}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

const SelectableList = wrapState(makeSelectable(List));

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
          <SelectableList defaultValue={1} onClick={window.matchMedia(layoutBreakpoint).matches ? () => {} : () => this.props.toggleSideNav()}>
            <ListItem value={1} primaryText="Subjects" containerElement={<Link to={'/'} />} leftIcon={<ContentInbox />} />
            <ListItem value={2} primaryText="Blocking Statistics" containerElement={<Link to={'/statistics/blocking'} />} leftIcon={<ActionAssessment />} />
            <ListItem value={3} primaryText="Similarity Measure" containerElement={<Link to={'/statistics/simmeasure'} />} leftIcon={<ActionAssessment />} />
            <ListItem value={4} primaryText="Tasks" containerElement={<Link to={'tasks'} />} leftIcon={<ActionGrade />} />
          </SelectableList>
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
  showSideNav: PropTypes.bool.isRequired,
  toggleSideNav: PropTypes.func.isRequired
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
