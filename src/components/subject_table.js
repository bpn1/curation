import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InteractiveTable from './interactive_table';
import { fetchSubjects, addSubject, updateSubject, deleteSubject } from '../actions/apiActions';

import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import {
  red600, green600, grey600
} from 'material-ui/styles/colors';

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
    this.props.fetchSubjects();
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

    let defaultTableData = [
      {
        "id": "6f399152-54d0-4ca3-bac5-555ee8d4bcec",
        "aliases": ["Hurrrrrr", "Hirrrrrrr", "Horrrrrrr"],
        "aliases_history": null,
        "category": "none whatsoever",
        "category_history": null,
        "name": "Testerino",
        "name_history": null,
        "properties": null,
        "properties_history": null,
        "relations": null,
        "relations_history": null
      }
    ];

    return (
      <div>
        <div style={{textAlign: 'left'}}> {/* right? */}
          <RaisedButton
            label="Add"
            style={buttonStyle}
            icon={<AddIcon />}
            backgroundColor={green600}
            onClick={this.addSubject.bind(this)} />
          <RaisedButton
            label="Delete"
            style={buttonStyle}
            icon={<DeleteIcon />}
            backgroundColor={red600}
            onClick={this.deleteSelectedSubjects.bind(this)} />
          <RaisedButton
            label="Settings"
            style={buttonStyle}
            icon={<SettingsIcon />}
            backgroundColor={grey600}
            onClick={this.showSettings.bind(this)} />
        </div>
        <br />
        <InteractiveTable headers={this.headers} data={this.state.tableData} />
      </div>
    );
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
