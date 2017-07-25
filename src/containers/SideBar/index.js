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
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentLink from 'material-ui/svg-icons/content/link';
import ActionHistory from 'material-ui/svg-icons/action/history';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import SocialGroup from 'material-ui/svg-icons/social/group';
import GraphIcon from 'material-ui/svg-icons/social/share';
import Link from 'react-router/es/Link';

import toggleSideNav from '../../actions/index';
import styles from './sidebar.css';
import { layoutBreakpoint } from '../../layout';
import image from '../../../logo.png';

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
          selectedItemStyle={this.props.selectedItemStyle}
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
    const selectedItemStyle = {
      backgroundColor: this.props.muiTheme.palette.selectedListItemColor
    };
    return (
      <div className={styles.sidebarWrapper}>
        <div className={overlayClass} onClick={() => this.props.toggleSideNav()} />
        <Drawer
          docked
          open={this.props.showSideNav}
          className={this.props.showSideNav && window.matchMedia(layoutBreakpoint).matches ? // The sidebar should not
            styles.sideBarOpen : styles.sideBarClosed} // take any width in parent container on mobile devices
          containerClassName={styles.sideNav}
          containerStyle={Object.assign(sideBarStyle, { backgroundColor: this.props.muiTheme.palette.backgroundColor })}
        >
          {!window.matchMedia(layoutBreakpoint).matches &&
          <div className={styles.avatarContainer}><Avatar size={80} src={image} /></div>}
          <SelectableList
            defaultValue={1}
            selectedItemStyle={selectedItemStyle}
            onClick={window.matchMedia(layoutBreakpoint).matches ? () => {
            } : () => this.props.toggleSideNav()}
          >
            <ListItem
              value={1}
              primaryText="Subjects"
              containerElement={<Link to={'/'} />}
              leftIcon={<ContentInbox />}
            />
            <ListItem
              value={2}
              primaryText="Versions"
              containerElement={<Link to={'/versions'} />}
              leftIcon={<ActionHistory />}
            />
            <ListItem
              value={3}
              primaryText="Graphs"
              containerElement={<Link to={'/graphs'} />}
              leftIcon={<GraphIcon />}
            />
            <Subheader>Deduplication</Subheader>
            <Divider className={styles.sideDivider} />
            <ListItem
              value={4}
              primaryText="Duplicates"
              containerElement={<Link to={'/duplicates'} />}
              leftIcon={<SocialGroup />}
            />
            <ListItem
              value={5}
              primaryText="Blocking&nbsp;Statistics"
              containerElement={<Link to={'/statistics/blocking'} />}
              leftIcon={<ActionAssessment />}
            />
            <ListItem
              value={6}
              primaryText="Similarity&nbsp;Measure"
              containerElement={<Link to={'/statistics/simmeasure'} />}
              leftIcon={<ActionAssessment />}
            />
            <Subheader>Textmining</Subheader>
            <Divider className={styles.sideDivider} />
            <ListItem
              value={7}
              primaryText="Entity Linking"
              containerElement={<Link to={'/entity_linking'} />}
              leftIcon={<ContentLink />}
            />
            <ListItem
              value={8}
              primaryText="Classifier&nbsp;Statistics"
              containerElement={<Link to={'/statistics/classifier'} />}
              leftIcon={<ActionAssessment />}
            />
          </SelectableList>
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

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(SideBar));
