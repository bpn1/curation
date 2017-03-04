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
      padding: this.props.muiTheme.spacing.padding,
      height: this.props.muiTheme.palette
    };

    const buttonMargin = '5';
    const buttonPadding = '0 ' + buttonMargin;
    const acceptStyle = {
      margin: buttonMargin,
      padding: buttonPadding,
      backgroundColor: this.props.muiTheme.palette.acceptColor
    };
    const denyStyle = {
      margin: buttonMargin,
      padding: buttonPadding,
      backgroundColor: this.props.muiTheme.palette.denyColor
    };
    const iconStyle = {
      position: 'relative',
      top: 5,
      left: -3,
      shadowColor: this.props.muiTheme.palette.shadowColor,
      shadowOffset: {
        width: 5,
        height: 5
      },
      shadowOpacity: 0.5,
      shadowRadius: 5
    };
    const rightGroupStyle = {
      align: 'right'
    };

    return (
      <Paper zDepth={1} className={styles.appToolbarContainer}>
        <Toolbar className={styles.toolbar} style={toolbarStyle}>
          <ToolbarGroup>
            <IconButton
              onTouchTap={() => this.props.toggleSideNav()}>
              <MenuIcon
                className={this.props.showSideNav ? styles.rotate : ''} />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup style={rightGroupStyle}>
            <FlatButton style={denyStyle}>
              <DeleteIcon style={iconStyle}/>
              Discard
            </FlatButton>
            <FlatButton style={acceptStyle}>
              <SaveIcon style={iconStyle}/>
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
