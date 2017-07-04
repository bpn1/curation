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
