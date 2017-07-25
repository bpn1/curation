import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './layout.css';

import { curationLightTheme, curationDarkTheme } from './themes/curation';

import ToolBar from './containers/ToolBar';
import SideBar from './containers/SideBar';
import DetailBar from './containers/DetailBar';

import StatusIndicator from './components/statusIndicator';
import CommitIndicator from './components/commitIndicator';

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

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
