import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import { toggleDetailNav } from '../../actions/index';
import { commerzbankYellow } from '../../themes/curation';
import SubjectEditor from '../../components/subject_editor';
import RelationEditor from '../../components/relation_editor';
import styles from './detailbar.css';

class DetailBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetailNav: false,
      content: props.content,
      editorId: null,
      editorEdge: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextState = {};

    if (nextProps.hasOwnProperty('showDetailNav')) {
      nextState.showDetailNav = nextProps.showDetailNav;
    }

    if (nextProps.content) {
      nextState.content = nextProps.content;
    }

    if (nextProps.editorType) {
      nextState.editorType = nextProps.editorType;
    }

    if (nextProps.editorValue) {
      if (typeof nextProps.editorValue === 'string') {
        nextState.editorId = nextProps.editorValue;
        nextState.editorEdge = null;
      } else {
        nextState.editorId = null;
        nextState.editorEdge = nextProps.editorValue;
      }
    }

    this.setState(nextState);
  }

  render() {
    // responsive sidebar styling
    const sideBarStyle = { top: 'auto', position: 'relative', width: '100%', boxShadow: 'none' };
    const overlayClass = styles.transparentOverlay; // styles.shadowedOverlay

    const showContent = this.state.content !== null && this.state.content !== '';
    const showSubjectEditor = !showContent && this.state.editorType === 'subject';
    const showRelationEditor = !showContent && !showSubjectEditor && this.state.editorType === 'relation';

    return (
      <div className={styles.sidebarWrapper}>
        <div className={overlayClass} onClick={() => this.props.toggleDetailNav()} />
        <Drawer
          docked
          openSecondary
          open={this.state.showDetailNav}
          width={400}
          className={this.state.showDetailNav ? styles.sideBarOpen : styles.sideBarClosed}
          containerClassName={styles.sideNav}
          containerStyle={sideBarStyle}
        >
          <div style={{ padding: 15 }}>
            { showContent && this.state.content }
            { showSubjectEditor && <SubjectEditor
              id={this.state.editorId}
              load
              enableReinitialize
              width={300}
              editorType="database"
            /> }
            { showRelationEditor && <RelationEditor
              sourceKey={this.state.editorEdge.source}
              targetKey={this.state.editorEdge.target}
              enableReinitialize
            /> }
          </div>
        </Drawer>
      </div>
    );
  }
}

DetailBar.propTypes = {
  showDetailNav: PropTypes.bool.isRequired,
  toggleDetailNav: PropTypes.func.isRequired,
  editorType: PropTypes.oneOf(['subject', 'relation']),
  editorValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

DetailBar.defaultProps = {
  editorType: 'subject',
  editorValue: '',
  content: ''
};

function mapStateToProps(state) {
  return {
    showDetailNav: state.detailNav.isOpen,
    editorType: state.detailNav.editorType,
    editorValue: state.detailNav.editorValue,
    content: state.detailNav.content
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleDetailNav }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBar);
