import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import styles from './layout.css'

import AppBar from 'material-ui/AppBar';
import HeadBar from './components/HeadBar'
import Paper from 'material-ui/Paper';
import ContentCard from './components/annotate'
import SideBar from './components/sidebar'
import Avatar from 'material-ui/Avatar';
import image from './images/kolage.jpg';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
//import MyCard from './components/myCard'
//import FlatButton from 'material-ui/FloatingActionButton';
//import ContentAdd from 'material-ui/svg-icons/content/add';
//import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const theme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class Layout extends Component {

  constructor() {
    super();
    this.state = {
      showSideNav: true
    }
  }

  toggleSideNav = () => this.setState({showSideNav: !this.state.showSideNav});

  render() {

    const toolbar = (<Toolbar style={{backgroundColor: '#FAFAFA'}}>
      <ToolbarGroup>
        <ToolbarTitle text="Toolbar"/>
      </ToolbarGroup>
    </Toolbar>);

    const rightMenu = (
      <Avatar src={image} />
    );

    const leftMenu = (
      <div>
        <span style={{fontSize: "x-large"}}>ModelFlow</span>
      </div>

    );

    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      backgroundColor: '#EEEEEE'
    };

    return (
      <MuiThemeProvider>
        <div style={{width: '100%'}}>
          <header>
            <Paper zDepth={1} style={{zIndex:"1300"}}>
              <HeadBar hasSearchBar={false} right={rightMenu} title={leftMenu}>Bla</HeadBar>
              {toolbar}
            </Paper>
          </header>

          <section>
            <SideBar zDepth={0} className={styles.nav}>
              <List>
                <ListItem primaryText="Services" leftIcon={<ContentInbox />}/>
                <ListItem primaryText="Tasks" leftIcon={<ActionGrade />}/>
                <ListItem primaryText="Data" leftIcon={<ContentSend />}/>
                <ListItem primaryText="Models" leftIcon={<ContentDrafts />}/>
              </List>
              <Divider style={{backgroundColor: '#CDCDCD'}}/>
              <List>
                <ListItem primaryText="All mail" rightIcon={<ActionInfo />}/>
                <ListItem primaryText="Trash" rightIcon={<ActionInfo />}/>
                <ListItem primaryText="Spam" rightIcon={<ActionInfo />}/>
                <ListItem primaryText="Follow up" rightIcon={<ActionInfo />}/>
              </List>
            </SideBar>
            <ContentCard/>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout
