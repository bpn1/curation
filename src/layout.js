import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Sidebar from './components/sidebar'
import AnnoView from './components/annotate'
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import image from './images/kolage.jpg';
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

    const tool = (<Toolbar style={{backgroundColor: '#FAFAFA'}}>
      <ToolbarGroup>
        <ToolbarTitle text="Toolbar"/>
      </ToolbarGroup>
    </Toolbar>);

    const flexContainer = {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    };

    return (
      <MuiThemeProvider>
        <div style={{height: 'inherit'}}>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{zIndex: 1300}}>
              <Paper zDepth={1}>
                <AppBar
                  zDepth={0}
                  iconStyleRight={{marginTop: 0, marginRight: 0}}
                  showMenuIconButton={false}
                  title="ModelFlow"
                  iconElementRight={<Avatar src={image} style={{marginTop: 13, marginRight: -10}}/>}
                  onRightIconButtonTouchTap={this.toggleSideNav}
                />
                {tool}
              </Paper>
            </div>
          </div>


          <div className="row" style={{height: 'inherit'}}>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"
                 style={{
                   paddingRight: 0,
                   borderRightStyle: 'solid',
                   borderRightWidth: 1,
                   borderRightColor: '#CDCDCD'
                 }}>
              <div style={flexContainer}>
                <Sidebar zDepth={0}/>
              </div>
            </div>

            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10"
                 style={{paddingLeft: 0, backgroundColor: "#EEEEEE"}}>
              <AnnoView />
            </div>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout
