import React, { Component } from 'react';
import muiThemable from 'material-ui/styles/muiThemeable';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import SaveIcon from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import { connect } from 'react-redux';

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
            <FlatButton className={styles.denyButton} style={denyStyle}>
              <DeleteIcon className={styles.buttonIcon}/>
              Discard
            </FlatButton>
            <FlatButton className={styles.acceptButton} style={acceptStyle}>
              <SaveIcon className={styles.buttonIcon}/>
              Apply
            </FlatButton>
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
