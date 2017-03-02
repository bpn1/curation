import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

import styles from './layout.css';
import image from '../logo.png';
import {fade} from "material-ui/utils/colorManipulator";
import {
  cyan500, grey400, orange200, orange400, darkBlack, grey500, white, grey300, fullBlack, cyan300, yellow100
} from "material-ui/styles/colors";

import InteractiveTable from './components/interactive_table';
import HeadBar from './components/HeadBar';
import ToolBar from './containers/ToolBar';
import SideBar from './containers/SideBar';
import Divider from 'material-ui/Divider';
import DiffTree from './components/difftree';
import ContentCard from './components/annotate';

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

    //const theme = getMuiTheme(darkBaseTheme);

    const customTheme = getMuiTheme({
      palette: {
        primary1Color: cyan300,
        primary2Color: yellow100,
        primary3Color: grey400,
        accent1Color: orange200,
        accent2Color: orange400,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: grey300,
        borderColor: grey500,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack
      }, appBar: {
        height: 70
      }
    });

    return (
      <MuiThemeProvider muiTheme={customTheme}>
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
