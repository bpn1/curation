import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Sidebar extends Component{  

  render() {
    const cstyle = {
      width: 'auto',
      backgroundColor: '#EEEEEE',
      position: '',
      borderRightStyle: 'solid',
      borderRightWidth: 1,
      borderRightColor: '#CDCDCD',
      minWidth: '190px',
      maxWidth: '230px'
    };

    const style = {
      height: 'inherit',
    };
    
    return (
      <Drawer open={this.props.showSideNav} zDepth={this.props.zDepth} style={style} containerStyle={cstyle}>
        <List>
          <ListItem primaryText="Services" leftIcon={<ContentInbox />} />
          <ListItem primaryText="Tasks" leftIcon={<ActionGrade />} />
          <ListItem primaryText="Data" leftIcon={<ContentSend />} />
          <ListItem primaryText="Models" leftIcon={<ContentDrafts />} />
        </List>
        <Divider style={{backgroundColor:'#CDCDCD'}}/>
        <List>
          <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
          <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
          <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
          <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
        </List>
      </Drawer>
    );
  }
}

export default Sidebar
