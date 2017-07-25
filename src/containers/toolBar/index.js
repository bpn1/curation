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
import connect from 'react-redux/es/connect/connect';
import bindActionCreators from 'redux/es/bindActionCreators';
import PropTypes from 'prop-types';
import muiThemable from 'material-ui/styles/muiThemeable';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import styles from './toolbar.css';
import toggleSideNav from '../../actions/index';

class ToolBar extends Component {
  render() {
    const toolbarStyle = {
      backgroundColor: this.props.muiTheme.palette.canvasColor
    };

    return (
      <Paper zDepth={1} className={styles.appToolbarContainer}>
        <Toolbar className={styles.toolbar} style={toolbarStyle}>
          <ToolbarGroup>
            <IconButton onTouchTap={() => this.props.toggleSideNav()}>
              <MenuIcon
                color={this.props.muiTheme.palette.textColor}
                className={this.props.showSideNav ? styles.rotate : ''}
              />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="Curation" style={{ color: this.props.muiTheme.palette.textColor }} />
          </ToolbarGroup>
          <ToolbarGroup>
            {this.props.children}
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

ToolBar.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(muiThemable()(ToolBar));
