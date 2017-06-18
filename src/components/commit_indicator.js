import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { Grid, Row } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

import { materialIcon, count } from '../helpers/index';
import SubjectDialog from './subject_dialog';

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

  addIcon = materialIcon('add_box', this.props.muiTheme.palette.positiveColor1);
  warningIcon = materialIcon('warning');
  updateIcon = materialIcon('mode_edit', this.props.muiTheme.palette.primary1Color);
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
      return this.props.muiTheme.palette.primary1Color;
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
              primary
              icon={this.warningIcon}
              label="Commit"
              type="submit"
              disabled={totalCount === 0}
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
    actions: {}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(CommitIndicator));
