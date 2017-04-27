import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

import styles from './layout.css';
import image from '../logo.png';

import theme from './themes/curation';

import HeadBar from './components/HeadBar';
import ToolBar from './containers/ToolBar';
import SideBar from './containers/SideBar';

export const layoutBreakpoint = '(min-width: 769px)';

class MainLayout extends Component {
  constructor() {
    super();
  }

  render() {
    const appTitle = (
      <div>
        <span className={styles.appHeaderText}>Curation</span>
      </div>
    );

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className={styles.appLayout}>
          <HeadBar
            showMiddle
            hasSearchBar
            left={<Avatar backgroundColor="#0000" size={64} src={image} />}
            middle={appTitle}
          />
          <ToolBar />
          <section className={styles.appMainContainer} style={{ backgroundColor: theme.palette.canvasColor }}>
            <SideBar />
            <div className="content">
              {this.props.children}
            </div>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MainLayout;
