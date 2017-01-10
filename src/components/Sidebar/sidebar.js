import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';

class Sidebar extends Component {

  render() {

    const cstyle = {
      width: 'auto',
      backgroundColor: '#EEEEEE',
      position: '',
      borderRight: '1px solid #CDCDCD',
      minWidth: '190px',
      maxWidth: '230px',
    };

    const style = {
      height: 'inherit'
    };

    return (
      <Drawer open={this.props.showSideNav} zDepth={this.props.zDepth} style={style} containerStyle={cstyle}>
        {this.props.children}
      </Drawer>
    );
  }
}

export default Sidebar
