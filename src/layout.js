import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

import styles from './layout.css';
import image from '../logo.png';

import curationTheme from './themes/curation';

import InteractiveTable from './components/interactive_table';
import HeadBar from './components/HeadBar';
import ToolBar from './containers/ToolBar';
import SideBar from './containers/SideBar';
import DiffTree from './components/difftree';
import ContentCard from './components/annotate';

export const layoutBreakpoint = '(min-width: 769px)';

class Layout extends Component {
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

    const tableData = [{ id: '1', properties: 'none', relations: 'none' }];

    return (
      <MuiThemeProvider muiTheme={curationTheme}>
        <div className={styles.appLayout}>
          <HeadBar
            showMiddle={true}
            hasSearchBar={true}
            left={<Avatar backgroundColor="#0000" size={64} src={image} />}
            middle={appTitle}
          />
          <ToolBar />
          <section className={styles.appMainContainer}>
            <SideBar />
            <ContentCard>
              <DiffTree />
              <br/>
              <InteractiveTable ref="table"
                headers={[
                  { key: 'id', name: 'ID' },
                  { key: 'properties', name: 'Properties' },
                  { key: 'relations', name: 'Relations' }
                ]} data={tableData}
              />
            </ContentCard>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
