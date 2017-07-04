import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

import styles from './layout.css';
import image from '../logo.png';

import { curationLightTheme, curationDarkTheme } from './themes/curation';
import RaisedButton from 'material-ui/RadioButton';

import HeadBar from './components/HeadBar';
import ToolBar from './containers/ToolBar';
import SideBar from './containers/SideBar';
import DetailBar from './containers/DetailBar';

import StatusIndicator from './components/status_indicator';
import CommitIndicator from './components/commit_indicator';

export const layoutBreakpoint = '(min-width: 769px)';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muiTheme: curationLightTheme
    };
  }

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme,
    });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={this.state.muiTheme}>
        <div className={styles.appLayout}>
          <ToolBar>
            <CommitIndicator />
            <StatusIndicator />
          </ToolBar>
          <section className={styles.appMainContainer} style={{ backgroundColor: this.state.muiTheme.palette.backgroundColor }}>
            <SideBar />
            <div style={{ padding: 10, width: '100%' }}>
              {this.props.children}
            </div>
            <DetailBar />
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MainLayout;
