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

/*const theme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});*/
const theme = getMuiTheme(darkBaseTheme);

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
    const toolbar = (
      <Toolbar
        className={styles.toolbar}
        style={{backgroundColor: '#FAFAFA', padding: '3px', height: '53px'}}
      >
        <ToolbarGroup>
          <IconButton>
            <MenuIcon
              className={this.state.rotate? styles.rotate: ''}
              onTouchTap={this.toggleSideNav.bind(this)}
            />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );

    const avatar = <Avatar style={{width: '60px', height: '60px'}} src={image} />;

    const appTitle = (
      <div>
        <span className={styles.appHeaderText}>ModelFlow</span>
      </div>
    );

    // responsive sidebar styling
    const sideBarStyle = window.matchMedia(layoutBreakpoint).matches ?
        {'top': 'auto', 'position': 'relative', 'width': '100%', boxShadow: 'none'} :
        {'position': 'absolute', 'top': 'auto', boxShadow: 'none'},
      overlayClass = !window.matchMedia(layoutBreakpoint).matches && this.state.showSideNav ?
        styles.shadowedOverlay : styles.transparentOverlay;

    let tableData = [{id: "1", properties: "none", relations: "none"}];

    let req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', '/data');
    const that = this;
    req.onload = function() {
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
          <ToolBar />
          <section className={styles.appMainContainer}>
            <div className={overlayClass} onClick={this.toggleSideNav.bind(this)} />
            <Drawer
              docked={true}
              open={this.state.showSideNav}
              className={this.state.showSideNav && window.matchMedia(layoutBreakpoint).matches ? // The sidebar should not
                            styles.sideBarOpen : styles.sideBarClosed} // take any width in parent container on mobile devices
              containerClassName={styles.sideNav}
              containerStyle={sideBarStyle}
            >
                  {window.matchMedia(layoutBreakpoint).matches ? null : <div className={styles.avatarContainer}> {avatar} </div> }
              <List onClick={window.matchMedia(layoutBreakpoint).matches ? () => {} : this.toggleSideNav.bind(this)}>
                <ListItem primaryText="Services" leftIcon={<ContentInbox />} />
                <ListItem primaryText="Tasks" leftIcon={<ActionGrade />} />
                <ListItem primaryText="Data" leftIcon={<ContentSend />} />
                <ListItem primaryText="Models" leftIcon={<ContentDrafts />} />
              </List>
              <Divider className={styles.sideDivider} />
              <List onClick={window.matchMedia(layoutBreakpoint).matches ? () => {} : this.toggleSideNav.bind(this)}>
                <ListItem primaryText="Settings" rightIcon={<ActionInfo />} />
                <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                <ListItem primaryText="Info" rightIcon={<ActionInfo />} />
              </List>
            </Drawer>
            <SideBar />
            <ContentCard ref="content">
              <InteractiveTable ref="table"
                headers={[
                  {key: "id", name: "ID"},
                  {key: "properties", name: "Properties"},
                  {key: "relations", name: "Relations"}
                ]} data={tableData}
              />
            </ContentCard>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }

  onload(req) {
    if(req.status == 200) {
      console.log("before parse");
      let data = JSON.parse(req.responseText);
      console.log("after parse");
      console.log("Data", data);
      this.refs.table.setState({
        tableData: data,
        filteredData: data
      });
    }
  }
}

export default Layout;
