import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InteractiveTable from './interactive_table';
import { fetchSubjects, addSubject, updateSubject, deleteSubject } from '../actions/apiActions';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import muiThemable from 'material-ui/styles/muiThemeable';

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
      deleteConfirmationOpen: false
    }
  }

  componentDidMount() {
    this.reloadSubjects();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tableData) {
      this.setState({
        tableData: nextProps.tableData
      });
    }
  }

  render() {
    const buttonStyle = { margin: 5 };
    const colors = this.props.muiTheme.palette;

    return (
      <div>
        <div style={{textAlign: 'right'}}>
          <IconButton
            tooltip="Add new"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.addSubject.bind(this)}
            style={buttonStyle}>
            <AddIcon color={colors.positiveColor1} hoverColor={colors.positiveColor2} />
          </IconButton>
          <IconButton
            tooltip="Delete selected"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.openDeleteConfirmationIfSelected.bind(this)}
            style={buttonStyle}>
            <DeleteIcon color={colors.negativeColor1} hoverColor={colors.negativeColor2} />
          </IconButton>
          <IconButton
            tooltip="Reload"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.reloadSubjects.bind(this)}
            style={buttonStyle}>
            <RefreshIcon color={colors.interactiveColor1} hoverColor={colors.interactiveColor2} />
          </IconButton>
          <IconButton
            tooltip="Settings"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.showSettings.bind(this)}
            style={buttonStyle}>
            <SettingsIcon color={colors.neutralColor1} hoverColor={colors.neutralColor2} />
          </IconButton>
        </div>
        <br />
        <InteractiveTable ref="table" headers={this.headers} data={this.state.tableData} />
        <SubjectDialog ref="subjectDialog" type="add" open={this.state.editorOpen} onRequestClose={this.closeEditor.bind(this)} />
        <Dialog ref="deleteConfirmationDialog"
                open={this.state.deleteConfirmationOpen}
                backgroundColor
                title="Are you sure?"
                modal={true}
                actions={[
                  <FlatButton label="Cancel" primary={false} onTouchTap={this.closeDeleteConfirmation.bind(this)} />,
                  <FlatButton label="Submit" primary={true} onTouchTap={this.deleteSelectedSubjects.bind(this)} keyboardFocused={true} />
                ]}>
          Do you really want to delete the selected subject entries?
          This will result in the loss of data.
        </Dialog>
      </div>
    );
  }

  reloadSubjects() {
    this.props.fetchSubjects();
  }

  addSubject() {
    this.refs['subjectDialog'].setState({id: null, type: 'add'});
    this.setState({editorOpen: true});
  }

  closeEditor() {
    this.setState({editorOpen: false});
  }

  openDeleteConfirmationIfSelected() {
    if(this.refs["table"].state.selectedRows.length > 0)
      this.setState({deleteConfirmationOpen: true});
  }

  closeDeleteConfirmation() {
    this.setState({deleteConfirmationOpen: false});
  }

  showSettings() {
    // TODO show popup with custom columns etc.
    console.log("TODO: Show settings popup")
  }

  deleteSelectedSubjects() {
    const selected = this.refs["table"].state.selectedRows;
    console.log("Deleting subjects", selected);
    selected.forEach(row => {
      this.props.deleteSubject(row.id);
      console.log("Deleting subject #", row.id);
    });

    this.closeDeleteConfirmation();
  }
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
