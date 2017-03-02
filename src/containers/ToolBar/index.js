import React, { Component } from 'react';
import muiThemable from 'material-ui/styles/muiThemeable';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { connect } from 'react-redux';

import styles from './toolbar.css';
import toggleSideNav from '../../actions/index';

class ToolBar extends Component {
  render() {
    const toolbarStyle = {
      backgroundColor: this.props.muiTheme.palette.canvasColor,
      padding: this.props.muiTheme.spacing.padding,
      height: this.props.muiTheme.palette
    };

    return (
      <Paper zDepth={1} className={styles.appToolbarContainer}>
        <Toolbar className={styles.toolbar} style={toolbarStyle}>
          <ToolbarGroup>
            <IconButton>
              <MenuIcon
                className={this.props.showSideNav ? styles.rotate : ''}
                onTouchTap={() => this.props.toggleSideNav()}
              />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

ToolBar.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(muiThemable()(ToolBar));
