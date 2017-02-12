import React, { Component } from 'react';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

import styles from './layout.css';
import InteractiveTable from './components/interactive_table'
import HeadBar from './components/HeadBar';
import ToolBar from './containers/ToolBar';
import SideBar from './containers/SideBar';
import ContentCard from './components/annotate';
import image from './images/kolage.jpg';

const theme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});
//const theme = getMuiTheme(darkBaseTheme);

export const layoutBreakpoint = '(min-width: 769px)';

const appTitle = (
  <div>
    <span className={styles.appHeaderText}>ModelFlow</span>
  </div>
);

class Layout extends Component {
  constructor() {
    super();
  }

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
            <ContentCard>
              <InteractiveTable
                headers={[
                {key: "id", name: "ID"},
                {key: "name", name: "Name"},
                {key: "importantNumber", name: "Important Number"}
                ]} data={[
                {"id": 1, "name": "Test", "importantNumber": 1337},
                {"id": 2, "name": "Testerino", "importantNumber": 42},
                {"id": 3, "name": "Testung", "importantNumber": 18},
                {"id": 1337, "name": "Testasterous", "importantNumber": 10000}
                ]}
              />
            </ContentCard>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
