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
  render() {

    const appTitle = (
      <div>
        <span className={styles.appHeaderText}>Curation</span>
      </div>
    );

    const tableData = [{ id: '1', properties: 'none', relations: 'none' }];

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
        this.refs.table.setState({
          tableData: data,
          filteredData: data
        });
      }
    };
    req.send(null);

    return (
      <MuiThemeProvider muiTheme={curationTheme}>
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
            <ContentCard>
              <DiffTree />
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
