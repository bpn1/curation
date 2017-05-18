import React, { Component } from 'react';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import InteractiveTable from './interactive_table';
import { fetchSubjects, addSubject, updateSubject, deleteSubject } from '../actions/apiActions';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import muiThemable from 'material-ui/styles/muiThemeable';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import MergeIcon from 'material-ui/svg-icons/editor/merge-type';
import GraphIcon from 'material-ui/svg-icons/social/share';
import EditIcon from 'material-ui/svg-icons/image/edit';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import SubjectDialog from './subject_dialog';

class SubjectTable extends Component {
  headers = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    { key: 'aliases', name: 'Aliases' },
    { key: 'category', name: 'Category' },
    { key: 'properties', name: 'Properties' },
    { key: 'relations', name: 'Relations' }
  ];

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      editorOpen: false,
      deleteConfirmationOpen: false,
      multipleDeletions: false,
      toBeDeletedID: null,
      toBeDeletedNames: [],
      settingsOpen: false
    };
  }

  componentDidMount() {
    this.listeners.reloadSubjects();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tableData) {
      this.setState({
        tableData: nextProps.tableData
      });
    }
  }

  iconStyle = {
    width: 18,
    height: 18
  };

  generateButtonColumn = (index, row) => {
    const colors = this.props.muiTheme.palette;

    // TODO add behaviour for graph button

    return (
      <div>
        <IconButton
          touch={true}
          onClick={evt => this.preventSelection(evt, () => this.listeners.editSubject(row.id)) }
          iconStyle={this.iconStyle}>
          <EditIcon color={colors.interactiveColor1} hoverColor={colors.interactiveColor2} />
        </IconButton>
        <IconButton
          touch={true}
          onClick={evt => this.preventSelection(evt, () => console.log("TODO implement graph function"))}
          iconStyle={this.iconStyle}>
          <GraphIcon color={colors.neutralColor1} hoverColor={colors.neutralColor2} />
        </IconButton>
        <IconButton
          touch={true}
          onClick={evt => this.preventSelection(evt, () => this.listeners.openDeleteConfirmationForSingleEntry(row.id, row.name)) }
          iconStyle={this.iconStyle}>
          <DeleteIcon color={colors.negativeColor1} hoverColor={colors.negativeColor2} />
        </IconButton>
      </div>
    )
  };

  preventSelection(evt, lambda) {
    lambda();
    evt.stopPropagation();
    evt.preventDefault();
  }

  render() {
    const colors = this.props.muiTheme.palette;

    const dialogTitleStyle = {
      display: 'inline-block',
      verticalAlign: 'center',
      marginTop: '30px'
    };

    const cogIconStyle = {
      color: '#444',
      borderRadius: '100px',
      width: '30px',
      height: '30px',
      padding: '4px'
    };

    const fireIconStyle = {
      color: '#E04C11',
      borderRadius: '100px',
      width: '30px',
      height: '30px',
      padding: '4px'
    };

    return (
      <div>
        <div style={{textAlign: 'right'}}>
          <IconButton
            tooltip="Add new"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.listeners.addSubject}
            style={this.iconButtonStyle}>
            <AddIcon color={colors.positiveColor1} hoverColor={colors.positiveColor2} />
          </IconButton>
          <IconButton
            tooltip="Merge selected"
            touch={true}
            tooltipPosition="top-center"
            onClick={evt => console.log("TODO: Add merge function")}
            style={this.iconButtonStyle}>
            <MergeIcon color={colors.semiNegativeColor1} hoverColor={colors.semiNegativeColor2} />
          </IconButton>
          <IconButton
            tooltip="Delete selected"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.listeners.openDeleteConfirmationIfSelected}
            style={this.iconButtonStyle}>
            <DeleteIcon color={colors.negativeColor1} hoverColor={colors.negativeColor2} />
          </IconButton>
          <IconButton
            tooltip="Reload"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.listeners.reloadSubjects}
            style={this.iconButtonStyle}>
            <RefreshIcon color={colors.interactiveColor1} hoverColor={colors.interactiveColor2} />
          </IconButton>
          <IconButton
            tooltip="Settings"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.listeners.showSettings}>
            <SettingsIcon color={colors.neutralColor1} hoverColor={colors.neutralColor2} />
          </IconButton>
        </div>
        <br />
        <InteractiveTable
          ref="table"
          headers={this.headers}
          data={this.state.tableData}
          buttonColumnGenerator={this.generateButtonColumn} />
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
            <FlatButton label="Cancel" primary={false} onTouchTap={this.listeners.closeDeleteConfirmation} keyboardFocused={true} />,
            <FlatButton label="Submit" primary={true} onTouchTap={this.listeners.deleteSelectedSubjects} />
          ]}>
          Do you really want to delete the selected subject{this.state.multipleDeletions ? " entries" : ""}?<br/>
          This will result in the loss of {this.state.multipleDeletions ? "these subjects" : "this subject"}:
          <ul>{ this.state.toBeDeletedNames.map(name => <li key={name}>{name}</li>) }</ul>
        </Dialog>
        <Dialog
          ref="settingsDialog"
            open={this.state.settingsOpen}
            backgroundColor
            title={
              <span>
                <span style={dialogTitleStyle}><span style={cogIconStyle}>⚙</span>️ TableSettings <span style={fireIconStyle}>🌶️</span></span>
              </span>}
            modal={true}
            actions={[
              <FlatButton label="Cancel" primary={false} onTouchTap={this.listeners.closeSettings} />,
              <FlatButton label="Save" primary={true} onTouchTap={this.listeners.saveSettings} keyboardFocused={true} />
            ]}>
          <p>ToDo: Add some settings :)</p>
          <TextField
            style={{ maxWidth: '100%', width: '100%' }}
            ref="filterIDSetting"
            hintText="Search for a given ID..."
            floatingLabelText="Filter ID"
            floatingLabelFixed={false}
            onChange={(field, event) => { console.log("🔥 Filter ID setting changed! 🌶", field, event) }}
          />
        </Dialog>
      </div>
    );
  }

  listeners = {
    reloadSubjects: () => {
      this.props.fetchSubjects();
    },
    addSubject: () => {
      this.refs['subjectDialog'].setState({id: null, type: 'add'});
      this.setState({editorOpen: true});
    },
    editSubject: (id) => {
      this.refs['subjectDialog'].setState({id: id, type: 'edit'});
      this.setState({editorOpen: true});
    },
    closeEditor: () => {
      this.setState({editorOpen: false});
    },
    openDeleteConfirmationIfSelected: () => {
      const selected = this.refs["table"].state.selectedRows;
      if(selected.length > 0) {
        const deletedNames = selected.map(row => row.name);

        this.setState({
          deleteConfirmationOpen: true,
          toBeDeletedNames: deletedNames,
          multipleDeletions: (selected.length > 1)
        });
      }
    },
    openDeleteConfirmationForSingleEntry: (id, name) => {
      this.setState({
        deleteConfirmationOpen: true,
        toBeDeletedID: id,
        toBeDeletedNames: [name],
        multipleDeletions: false
      })
    },
    closeDeleteConfirmation: () => {
      this.setState({deleteConfirmationOpen: false});
    },
    deleteSelectedSubjects: () => {
      let selected;
      if(this.state.toBeDeletedID) {
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
      this.setState({settingsOpen: true});
    },
    closeSettings: () => {
      this.setState({settingsOpen: false});
    },
    saveSettings: () => {
      // TODO add Redux action and connect it to this component
      // TODO add Redux state component that contains the settings for this component (needs to be saved in server)
      // TODO maybe use Redux connection in SubjectTable and keep this component clean
      // TODO just add callback props that are called when the data should be saved
      this.closeSettings();
    }
  };
}

/* connection to Redux */
function mapStateToProps(state) {
  return {
    tableData: state.api.subjects,
    error: state.api.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSubjects, addSubject, updateSubject, deleteSubject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemable()(SubjectTable));
