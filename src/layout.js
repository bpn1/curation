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
  // TODO refactor with Redux
  fetchData() {
    const req = new XMLHttpRequest();
    req.overrideMimeType('application/json');
    req.open('GET', '/data');
    const that = this;
    req.onload = function () {
      if (req.status === 200) {
        console.log('before parse');
        const data = JSON.parse(req.responseText);
        console.log('after parse');
        console.log('Data', data);
        that.refs.table.setState({
          tableData: data,
          filteredData: data
        });
      }
    };
    req.send(null);
  }

  constructor() {
    super();
    this.fetchData();
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
