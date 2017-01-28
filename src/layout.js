import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
import HeadBar from './components/HeadBar'
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
      showSideNav: true
    }
  }

  toggleSideNav = () => this.setState({showSideNav: !this.state.showSideNav});

  render() {

    const toolbar = (<Toolbar className={styles.toolbar}>
      <ToolbarGroup>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </ToolbarGroup>
    </Toolbar>);

    const rightMenu = (
      <Avatar src={image}/>
    );

    const leftMenu = (
      <div>
        <span style={{fontSize: "x-large", fontFamily: "Roboto, sans-serif"}}>ModelFlow</span>
      </div>
    );

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className={styles.appLayout}>
          <header className={styles.appHeader}>
            <HeadBar showMiddle={false}  middle="Message" right={rightMenu} left={leftMenu}>Bla</HeadBar>
          </header>

          <section className={styles.appBody}>
            <Paper zDepth={1} className={styles.appToolbarContainer}>
              {toolbar}
            </Paper>

            <div className={styles.appMainContainer}>
              <Drawer zDepth={0} containerClassName={styles.sideNav}>
                <List>
                  <ListItem primaryText="Services" leftIcon={<ContentInbox />}/>
                  <ListItem primaryText="Tasks" leftIcon={<ActionGrade />}/>
                  <ListItem primaryText="Data" leftIcon={<ContentSend />}/>
                  <ListItem primaryText="Models" leftIcon={<ContentDrafts />}/>
                </List>
                <Divider style={{backgroundColor: '#CDCDCD'}}/>
                <List>
                  <ListItem primaryText="Settings" rightIcon={<ActionInfo />}/>
                  <ListItem primaryText="Trash" rightIcon={<ActionInfo />}/>
                  <ListItem primaryText="Info" rightIcon={<ActionInfo />}/>
                </List>
              </Drawer>
              <ContentCard>
                <InteractiveTable />
              </ContentCard>
            </div>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout
