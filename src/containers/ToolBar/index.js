import React, {Component} from 'react';
import styles from './toolbar.css';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { connect } from 'react-redux';
import { toggleSideNav } from '../../actions/index';
import { bindActionCreators } from 'redux';

class ToolBar extends Component {
    render() {
        return (
        <Paper zDepth={1} className={styles.appToolbarContainer}>
          <Toolbar
            className={styles.toolbar}
            style={{backgroundColor: '#FAFAFA', padding: '3px', height: '53px'}}
          >
            <ToolbarGroup>
              <IconButton>
                <MenuIcon
                  className={this.props.showSideNav? styles.rotate : ''}
                  onTouchTap={() => this.props.toggleSideNav()}
                />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
        </Paper>);
    }
}

function mapStateToProps(state) {
    return {
        showSideNav: state.showSideNav
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleSideNav: toggleSideNav }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
