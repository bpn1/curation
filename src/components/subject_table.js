import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import { Col, Grid, Row } from "react-flexbox-grid";

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';
import muiThemable from 'material-ui/styles/muiThemeable';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import MergeIcon from 'material-ui/svg-icons/editor/merge-type';
import GraphIcon from 'material-ui/svg-icons/social/share';
import EditIcon from 'material-ui/svg-icons/image/edit';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import InteractiveTable from './interactive_table';
import SubjectDialog from './subject_dialog';
import { subjects, dbpediaSubjects, wikiDataSubjects } from '../ducks/subjectDuck';

class SubjectTable extends Component {
  constructor(props) {
    super(props);

    // TODO load from/ save to Redux settings?
    const defaultHiddenColumns = ["id", "aliases", "category", "relations"];

    this.state = {
      tableData: [],
      hiddenColumns: defaultHiddenColumns,
      hiddenColumnsVal: defaultHiddenColumns.join(", "),
      editorOpen: false,
      deleteConfirmationOpen: false,
      multipleDeletions: false,
      toBeDeletedID: null,
      toBeDeletedNames: [],
      settingsOpen: false,
      refreshStatus: props.fetchOnMount ? 'loading' : 'hide',
      selectedRows: []
    };
  }

  componentDidMount() {
    if (this.props.fetchOnMount) {
      this.listeners.reloadSubjects();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tableData) {
      this.setState({
        tableData: nextProps.tableData
      });
    }

    if (nextProps.loading !== null) {
      this.setState({
        refreshStatus: nextProps.loading ? "loading" : "hide"
      });
    }
  }

  preventSelection(evt, lambda) {
    lambda();
    evt.stopPropagation();
    evt.preventDefault();
  }

  styles = {
    dialogTitle: {
      display: 'inline-block',
      verticalAlign: 'center',
      marginTop: '30px'
    },
    cogIcon: {
      color: '#444',
      borderRadius: '100px',
      width: '30px',
      height: '30px',
      padding: '4px'
    },
    chiliIcon: {
      color: '#E04C11',
      borderRadius: '100px',
      width: '30px',
      height: '30px',
      padding: '4px'
    },
    refreshContainer: {
      position: 'relative'
    },
    refreshIndicator: {
      display: 'inline-block',
      marginLeft: '50%'
    }
  };

  render() {
    const colors = this.props.muiTheme.palette;

    const buttonBarHeight = 48;

    const selectionCount = this.state.selectedRows.length;
    const showSelectionButtons = selectionCount > 0;
    const showSingleSelectionButtons = selectionCount === 1;
    const showMultipleSelectionButtons = selectionCount > 1;

    // TODO add behaviour for graph button
    return (
      <Grid fluid>
        <Row end="xs">
          <Col>
            <CustomButton
              tooltip="Edit selected"
              visible={showSingleSelectionButtons}
              onClick={evt => this.preventSelection(evt, () => this.listeners.editSelectedSubject())}>
              <EditIcon color={colors.interactiveColor1} hoverColor={colors.interactiveColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Merge selected"
              visible={showMultipleSelectionButtons}
              onClick={evt => console.log("TODO: Add merge function")}>
              <MergeIcon color={colors.semiNegativeColor1} hoverColor={colors.semiNegativeColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Delete selected"
              visible={showSelectionButtons}
              onClick={this.listeners.openDeleteConfirmationIfSelected}>
              <DeleteIcon color={colors.negativeColor1} hoverColor={colors.negativeColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Show selection graph"
              visible={showSelectionButtons}
              onClick={evt => this.preventSelection(evt, () => console.log("TODO implement graph function"))}>
              <GraphIcon color={colors.neutralColor1} hoverColor={colors.neutralColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Add new"
              onClick={this.listeners.addSubject}>
              <AddIcon color={colors.positiveColor1} hoverColor={colors.positiveColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Reload"
              onClick={this.listeners.reloadSubjects}>
              <RefreshIcon color={colors.interactiveColor1} hoverColor={colors.interactiveColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Settings"
              onClick={this.listeners.showSettings}>
              <SettingsIcon color={colors.neutralColor1} hoverColor={colors.neutralColor2} />
            </CustomButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={this.styles.refreshContainer}>
              <RefreshIndicator
                status={this.state.refreshStatus}
                style={this.styles.refreshIndicator}
                size={40}
                left={-20}
                top={-50} />
            </div>
            <InteractiveTable
              height={this.props.height - buttonBarHeight}
              ref="table"
              expandKey={'id'}
              headers={this.props.headers}
              data={this.state.tableData}
              muiTheme={this.props.muiTheme}
              onSelectionChange={this.listeners.handleSelectionChange}
              hiddenColumns={this.state.hiddenColumns} /></Col>
        </Row>
        {/* these elements are hidden by default */}
        <SubjectDialog
          ref="subjectDialog"
          type="add"
          open={this.state.editorOpen}
          onRequestClose={this.listeners.closeEditor} />
        <Dialog
          ref="deleteConfirmationDialog"
          open={this.state.deleteConfirmationOpen}
          title="Are you sure?"
          modal={true}
          actions={[
            <FlatButton label="Cancel" primary={false} onTouchTap={this.listeners.closeDeleteConfirmation}
                        keyboardFocused={true} />,
            <FlatButton label="Submit" primary={true} onTouchTap={this.listeners.deleteSelectedSubjects} />
          ]}>
          Do you really want to delete the selected subject{this.state.multipleDeletions ? " entries" : ""}?<br />
          This will result in the loss of {this.state.multipleDeletions ? "these subjects" : "this subject"}:
          <ul>{this.state.toBeDeletedNames.map(name => <li key={name}>{name}</li>)}</ul>
        </Dialog>
        <Dialog
          ref="settingsDialog"
          open={this.state.settingsOpen}
          backgroundColor
          title={
            <span style={this.styles.dialogTitle}>
                <span style={this.styles.cogIcon}>⚙</span>️ TableSettings <span style={this.styles.chiliIcon}>🌶️</span>
              </span>}
          modal={true}
          actions={[
            <FlatButton label="Cancel" primary={false} onTouchTap={this.listeners.closeSettings} />,
            <FlatButton label="Save" primary={true} onTouchTap={this.listeners.saveSettings} keyboardFocused={true} />
          ]}>
          <TextField
            style={{ maxWidth: '100%', width: '100%' }}
            ref="setting_hiddenColumns"
            hintText="Enter column names, comma-separated..."
            floatingLabelText="Hidden columns"
            floatingLabelFixed={false}
            value={this.state.hiddenColumnsVal}
            onChange={this.listeners.hiddenColumnsChanged}
          />
        </Dialog>
      </Grid>
    );
  }

  listeners = {
    handleSelectionChange: (selectedRows) => {
      this.setState({ selectedRows });
    },
    reloadSubjects: () => {
      this.props.actions.subject.fetch();
    },
    addSubject: () => {
      this.refs['subjectDialog'].setState({ id: null, type: 'add' });
      this.setState({ editorOpen: true });
    },
    editSelectedSubject: () => {
      if (this.state.selectedRows.length !== 1) {
        console.error("Edit button clicked although there wasn't exactly 1 subject selected! Button should be hidden!");
        return;
      }

      const id = this.state.selectedRows[0].id;
      this.refs['subjectDialog'].setState({ id: id, type: 'edit' });
      this.setState({ editorOpen: true });
    },
    closeEditor: () => {
      this.setState({ editorOpen: false });
    },
    openDeleteConfirmationIfSelected: () => {
      const selected = this.state.selectedRows;
      if (selected.length > 0) {
        const deletedNames = selected.map(row => row.name);

        this.setState({
          deleteConfirmationOpen: true,
          toBeDeletedNames: deletedNames,
          multipleDeletions: (selected.length > 1)
        });
      }
    },
    closeDeleteConfirmation: () => {
      this.setState({ deleteConfirmationOpen: false });
    },
    deleteSelectedSubjects: () => {
      let selected;
      if (this.state.toBeDeletedID) {
        selected = [this.state.toBeDeletedID];
        this.setState({ toBeDeletedID: null });
      } else {
        selected = this.refs["table"].state.selectedRows.map(row => row.id);
      }

      console.log("Deleting subjects", selected);
      selected.forEach(id => {
        // TODO re-enable once the server has been updated to use tombstones instead of deletions
        // this.props.deleteSubject(id);
        console.log("Deleting subject #", id);
      });

      this.closeDeleteConfirmation();
    },
    showSettings: () => {
      this.setState({ settingsOpen: true });
    },
    closeSettings: () => {
      this.setState({ settingsOpen: false });
    },
    saveSettings: () => {
      // TODO add Redux action and connect it to this component
      // TODO add Redux state component that contains the settings for this component (needs to be saved in server)
      // TODO maybe use Redux connection in SubjectTable and keep this component clean
      // TODO just add callback props that are called when the data should be saved
      this.listeners.closeSettings();
    },
    hiddenColumnsChanged: (event) => {
      const hiddenColumnsVal = event.target.value;
      const hiddenColumns = hiddenColumnsVal.split(',').map(str => str.trim().toLowerCase());
      this.setState({ hiddenColumns, hiddenColumnsVal });
    }
  };
}

SubjectTable.defaultProps = {
  fetchOnMount: true,
  headers: [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    { key: 'aliases', name: 'Aliases' },
    { key: 'category', name: 'Category' },
    { key: 'properties', name: 'Properties' },
    { key: 'relations', name: 'Relations' }
  ]
};

SubjectTable.propTypes = {
  height: PropTypes.number.isRequired,
  fetchOnMount: PropTypes.bool,
  headers: PropTypes.array
};

const CustomButton = ({ tooltip, onClick, children, visible = true }) => {
  return (visible &&
    <IconButton
      tooltip={tooltip}
      touch={true}
      tooltipPosition="top-center"
      onClick={onClick}>
      {children}
    </IconButton>);
};

/* connection to Redux */
function mapStateToProps(state) {
  const tableData = state.subject.entities;
  // load candidateScores from duplicate.store
  if (tableData && state.duplicate.store && state.duplicate.store.candidateScores) {
    tableData.forEach((subject) => subject.candidateScore = state.duplicate.store.candidateScores[subject.id])
  }
  return {
    tableData: tableData,
    error: state.subject.error,
    loading: state.subject.status === 'LOADING' // TODO does not work for duplicates because status is cleared before finishing all tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      subject: bindActionCreators(subjects.creators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemable()(SubjectTable));
