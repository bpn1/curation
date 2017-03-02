import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

import styles from './layout.css';
import InteractiveTable from './components/interactive_table';
import HeadBar from './components/HeadBar';
import ToolBar from './containers/ToolBar';
import SideBar from './containers/SideBar';
import Divider from 'material-ui/Divider';
import DiffTree from './components/difftree';
import ContentCard from './components/annotate';
import image from './images/kolage.jpg';

const theme = getMuiTheme(darkBaseTheme);

export const layoutBreakpoint = '(min-width: 769px)';

class Layout extends Component {
  onload(req) {
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
  }

  render() {
    const avatar = <Avatar style={{ width: '60px', height: '60px' }} src={image} />;

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
      that.onload(req);
    };
    req.send(null);

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className={styles.appLayout}>
          <HeadBar
            showMiddle={false}
            hasSearchBar={false}
            right={<Avatar size={40} src={image} />}
            left={appTitle}
          />
          <ToolBar showSideNav="" toggleSideNav=""/>
          <section className={styles.appMainContainer}>
            <SideBar />
            <ContentCard>
              <DiffTree />
              <Divider />
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
