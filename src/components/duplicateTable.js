import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import muiThemeable from 'material-ui/styles/muiThemeable';

import InteractiveTable from './interactive_table';
import duplicateDuck from '../ducks/duplicateDuck';
import { subjects, dbpediaSubjects, wikiDataSubjects } from '../ducks/subjectDuck';

class DuplicateTable extends Component {
  headers = [
    { key: 'subject', name: 'Subject' },
    { key: 'candidates', name: 'Duplicates' },
  ];

  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    this.listeners.reloadDuplicates();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tableData) {
      const tableData = nextProps.tableData;
      tableData.forEach(function (entry, i) {
        if (nextProps.subjectFetched && entry.subject_id === nextProps.subjectFetched.id) {
          tableData[i].subject = nextProps.subjectFetched;
        } else {
          tableData[i].subject = entry.subject_name;
        }
      });
      this.setState({
        tableData: tableData
      });
    }
  }

  handleCellClick(rowNumber) {
    const id = this.state.tableData[rowNumber].subject_id;
    const candidateIds = [];
    const candidateScores = [];
    this.state.tableData[rowNumber].candidates.forEach((entry) => {
      candidateIds.push(entry.id);
      candidateScores[entry.id] = entry.score;
    });
    if (typeof id === 'string') {
      this.props.actions.subject_dbpedia.get(id);
    }
    this.props.actions.subject_wikidata.getSome(candidateIds, 200); // TODO make count a user option
    this.props.actions.duplicate.store({ candidateScores });
  }

  render() {
    return (
      <InteractiveTable
        ref="table"
        height={this.props.height}
        expandKey={'subject_id'}
        expandTreeByDefaultColumns={['subject']}
        headers={this.headers}
        data={this.state.tableData}
        showCheckboxes={false}
        multiSelectable={false}
        selectable
        onCellClick={(rowNumber, columnId) => this.handleCellClick(rowNumber)}
        muiTheme={this.props.muiTheme}
      />
    );
  }

  listeners = {
    reloadDuplicates: () => {
      this.props.actions.duplicate.fetch(100); // TODO make count a user option
    }
  };
}

DuplicateTable.propTypes = {
  height: PropTypes.number.isRequired
};

/* connection to Redux */
function mapStateToProps(state) {
  return {
    tableData: state.duplicate.entities,
    subjectFetched: state.subject.entity,
    error: state.duplicate.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      duplicate: bindActionCreators(duplicateDuck.creators, dispatch),
      subject_dbpedia: bindActionCreators(subjects.creators, dispatch),
      subject_wikidata: bindActionCreators(wikiDataSubjects.creators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(DuplicateTable));
