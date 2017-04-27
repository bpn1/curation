import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InteractiveTable from './interactive_table';
import { fetchSubjects, addSubject, updateSubject, deleteSubject } from '../actions/apiActions';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import {
  red600, red400, green600, green400, grey600, grey400, yellow400
} from 'material-ui/styles/colors';
import {commerzbankYellow} from "../themes/curation";

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
      tableData: []
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

    return (
      <div>
        <div style={{textAlign: 'right'}}>
          <IconButton
            tooltip="Add new"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.addSubject.bind(this)}
            style={buttonStyle}>
            <AddIcon color={green600} hoverColor={green400} />
          </IconButton>
          <IconButton
            tooltip="Delete selected"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.deleteSelectedSubjects.bind(this)}
            style={buttonStyle}>
            <DeleteIcon color={red600} hoverColor={red400} />
          </IconButton>
          <IconButton
            tooltip="Reload"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.reloadSubjects.bind(this)}
            style={buttonStyle}>
            <RefreshIcon color={commerzbankYellow} hoverColor={yellow400} /> {/* TODO use darker commerzbankYellow here */}
          </IconButton>
          <IconButton
            tooltip="Settings"
            touch={true}
            tooltipPosition="top-center"
            onClick={this.showSettings.bind(this)}
            style={buttonStyle}>
            <SettingsIcon color={grey600} hoverColor={grey400} />
          </IconButton>
        </div>
        <br />
        <InteractiveTable headers={this.headers} data={this.state.tableData} />
      </div>
    );
  }

  reloadSubjects() {
    this.props.fetchSubjects();
  }

  addSubject() {
    // TODO show subject form in second sidebar (right) => detail view
    console.log("TODO: Show subject detail view for adding a new subject");
  }

  showSettings() {
    // TODO show popup with custom columns etc.
    console.log("TODO: Show settings popup")
  }

  deleteSelectedSubjects() {
    const selected = this.refs["table"].state.selectedRows;

    selected.forEach(row => {
      this.props.deleteSubject(row.id);
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(SubjectTable);
