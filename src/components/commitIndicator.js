/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { Grid, Row } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


import { materialIcon, count } from '../helpers/index';
import SubjectDialog from './subjectDialog';
import { subjects } from '../ducks/subjectDuck';

const changeCountStyle = {
  marginRight: 8,
  fontSize: 20,
  fontWeight: 'normal'
};

class StagedListEntry extends Component {
  constructor() {
    super();
    this.onTouchTap = this.onTouchTap.bind(this);
  }
  onTouchTap() {
    this.props.openEditor(this.props.id, this.props.stage);
  }
  render() {
    return (
      <ListItem
        primaryText={this.props.name}
        secondaryText={this.props.id}
        onTouchTap={this.onTouchTap}
      />
    );
  }
}

class CommitIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      editorOpen: false,
      snackbarOpen: false,
    };
  }

  openCommitView = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  closeEditor = () => {
    this.setState({ editorOpen: false });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleCommit = () => {
    const changes = {
      created: this.props.created,
      updated: this.props.updated,
      deleted: this.props.deleted,
    };
    this.props.actions.subject.commit(changes);
    this.props.actions.subject.reset();
    this.setState({
      open: false,
    });
  };

  addIcon = materialIcon('add_box', this.props.muiTheme.palette.positiveColor1);
  warningIcon = materialIcon('warning');
  updateIcon = materialIcon('mode_edit', this.props.muiTheme.palette.interactiveColor1);
  deleteIcon = materialIcon('delete', this.props.muiTheme.palette.negativeColor1);

  openEditor = (id, stage) => {
    this.refs.subjectDialog.setState({ id: id, type: stage, titleColor: this.editorTypeColor(stage) });
    this.setState({ editorOpen: true });
  };

  editorTypeColor(type) {
    if (type === 'created' || type === 'new') {
      return this.props.muiTheme.palette.positiveColor1;
    }
    if (type === 'updated') {
      return this.props.muiTheme.palette.interactiveColor1;
    }
    if (type === 'deleted') {
      return this.props.muiTheme.palette.negativeColor1;
    }
    return this.props.muiTheme.palette.textColor;
  }

  editorTypeIcon(type) {
    if (type === 'created') {
      return this.addIcon;
    }
    if (type === 'updated') {
      return this.updateIcon;
    }
    if (type === 'deleted') {
      return this.deleteIcon;
    }
  }

  renderStagedEntry(entry, stage) {
    return (
      <StagedListEntry
        key={entry.id}
        name={entry.name}
        id={entry.id}
        openEditor={this.openEditor}
        stage={stage}
      />
    );
  }

  renderStagedList(stage, color, icon) {
    const stageCount = count(this.props[stage]);
    return (
      <ListItem
        key={stage}
        primaryText={`${stageCount} ${stage} subjects`}
        style={{ color }}
        leftIcon={icon}
        initiallyOpen={false}
        primaryTogglesNestedList
        nestedItems={Object.values(this.props[stage]).map(entry => this.renderStagedEntry(entry, stage))}
      />
    );
  }

  render() {
    const { createdCount, updatedCount, deletedCount } = this.props;
    const totalCount = createdCount + updatedCount + deletedCount;

    return (
      <div>
        <FlatButton
          onTouchTap={this.openCommitView}
        >
          <Grid fluid>
            <Row middle="xs">
              {this.editorTypeIcon('created')}
              <span style={{
                ...changeCountStyle,
                color: this.editorTypeColor('created')
              }}
              >{createdCount}</span>
              {this.editorTypeIcon('updated')}
              <span style={{
                ...changeCountStyle,
                color: this.editorTypeColor('updated')
              }}
              >{updatedCount}</span>
              {this.editorTypeIcon('deleted')}
              <span style={{
                ...changeCountStyle,
                color: this.editorTypeColor('deleted')
              }}
              >{deletedCount}</span>
            </Row>
          </Grid>
        </FlatButton>
        <Dialog
          autoDetectWindowHeight={false}
          style={{ maxHeight: `${window.innerHeight / 4}px` }}
          title={'Commit changes'}
          open={this.state.open}
          modal={false}
          autoScrollBodyContent
          onRequestClose={this.handleRequestClose}
        >
          <List>
            {/* TODO: extract listItem to function */}
            {['created', 'updated', 'deleted'].map(type =>
              this.renderStagedList(type, this.editorTypeColor(type), this.editorTypeIcon(type))
            )}
          </List>
          <div style={{ textAlign: 'right' }}>
            <RaisedButton
              style={{ marginTop: 10 }}
              backgroundColor={this.props.muiTheme.palette.interactiveColor1}
              icon={this.warningIcon}
              label="Commit"
              type="submit"
              disabled={totalCount === 0}
              onTouchTap={this.handleCommit}
            />
          </div>
        </Dialog>
        <SubjectDialog
          ref="subjectDialog"
          open={this.state.editorOpen}
          onRequestClose={this.closeEditor}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    created: state.subject.created,
    updated: state.subject.updated,
    deleted: state.subject.deleted,
    createdCount: count(state.subject.created),
    updatedCount: count(state.subject.updated),
    deletedCount: count(state.subject.deleted),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      subject: bindActionCreators(subjects.creators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(CommitIndicator));
