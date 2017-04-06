import React, { Component } from 'react';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

import styles from './layout.css';
import HeadBar from './components/HeadBar';
import ToolBar from './containers/ToolBar';
import SideBar from './containers/SideBar';
import image from './images/kolage.jpg';

const theme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});
// const theme = getMuiTheme(darkBaseTheme);

export const layoutBreakpoint = '(min-width: 769px)';

const appTitle = (
  <div>
    <span className={styles.appHeaderText}>ModelFlow</span>
  </div>
);

class MainLayout extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className={styles.appLayout}>
          <HeadBar
            showMiddle={false}
            hasSearchBar={false}
            right={<Avatar size={40} src={image} />}
            left={appTitle}
          />
          <ToolBar />
          <section className={styles.appMainContainer}>
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
