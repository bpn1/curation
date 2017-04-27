import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import muiThemable from 'material-ui/styles/muiThemeable';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import SaveIcon from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import { red600, green600 } from 'material-ui/styles/colors';

import styles from './toolbar.css';
import toggleSideNav from '../../actions/index';

class ToolBar extends Component {
  render() {
    const toolbarStyle = {
      backgroundColor: this.props.muiTheme.palette.canvasColor,
      //height: this.props.muiTheme.appBar.height
    };
    const denyStyle = {
      backgroundColor: this.props.muiTheme.palette.denyColor
    };
    const acceptStyle = {
      backgroundColor: this.props.muiTheme.palette.acceptColor
    };

    return (
      <Paper zDepth={1} className={styles.appToolbarContainer}>
        <Toolbar className={styles.toolbar} style={toolbarStyle}>
          <ToolbarGroup>
            <IconButton onTouchTap={() => this.props.toggleSideNav()}>
              <MenuIcon className={this.props.showSideNav ? styles.rotate : ''} />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup className={styles.rightGroup}>
            <div>
              <RaisedButton style={{margin: 5}} icon={<DeleteIcon />} label="Discard" backgroundColor={red600} />
              <RaisedButton style={{margin: 5}} icon={<SaveIcon />} label="Apply" backgroundColor={green600} />
            </div>
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
