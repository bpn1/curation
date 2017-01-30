import React, { Component } from 'react';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import styles from './layout.css';
import InteractiveTable from './components/interactive_table'
import HeadBar from './components/HeadBar';
import ContentCard from './components/annotate';
import image from './images/kolage.jpg';

const theme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});
//const theme = getMuiTheme(darkBaseTheme);

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      showSideNav: true,
      rotate: false
    }
  }

  toggleSideNav() {
      this.setState({showSideNav: !this.state.showSideNav,
                     rotate: !this.state.rotate});
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

    const rightMenu = <Avatar src={image} />;

    const leftMenu = (
      <div>
        <span className={styles.appHeaderText}>ModelFlow</span>
      </div>
    );

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className={styles.appLayout}>
          <header className={styles.appHeader}>
            <HeadBar
              showMiddle={false}
              hasSearchBar={false}
              right={rightMenu}
              left={leftMenu}
            />
          </header>
          <Paper zDepth={1} className={styles.appToolbarContainer}>
            {toolbar}
          </Paper>
          <section className={styles.appMainContainer}>
            <Drawer
              docked={true}
              open={this.state.showSideNav}
              className={this.state.showSideNav? styles.sideBarOpen : styles.sideBarClosed}
              containerClassName={styles.sideNav}
              containerStyle={{'top': 'auto', 'position': 'relative', 'width': '100%'}}
            >
              <List>
                <ListItem primaryText="Services" leftIcon={<ContentInbox />} />
                <ListItem primaryText="Tasks" leftIcon={<ActionGrade />} />
                <ListItem primaryText="Data" leftIcon={<ContentSend />} />
                <ListItem primaryText="Models" leftIcon={<ContentDrafts />} />
              </List>
              <Divider className={styles.sideDivider} />
              <List>
                <ListItem primaryText="Settings" rightIcon={<ActionInfo />} />
                <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                <ListItem primaryText="Info" rightIcon={<ActionInfo />} />
              </List>
            </Drawer>
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

export default Layout
