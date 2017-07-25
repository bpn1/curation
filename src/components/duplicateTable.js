import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Grid, Col, Row } from 'react-flexbox-grid';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';

import InteractiveTable from './interactiveTable';
import duplicateDuck from '../ducks/duplicateDuck';
import { subjects, tempSubjects, dbpediaSubjects, wikiDataSubjects } from '../ducks/subjectDuck';

class DuplicateTable extends Component {
  headers = [
    { key: 'subject', name: 'Subject' },
    { key: 'candidates', name: 'Duplicates' },
  ];

  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      count: 50
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
    const datasource = this.state.tableData[rowNumber].datasource;
    const candidateIds = [];
    const candidateScores = {};
    this.state.tableData[rowNumber].candidates.forEach((entry) => {
      candidateIds.push(entry.id);
      candidateScores[entry.id] = entry.score;
    });
    if (typeof id === 'string') {
      this.props.actions.subject.getById(id);
    }
    this.props.actions[datasource].getSome(candidateIds, 200); // TODO make count a user option
    this.props.actions.duplicate.store({ candidateScores });
  }

  handleSearchRequest = (searchInput, index) => {
    this.props.actions.duplicate.findByName(searchInput, this.state.count);
  };

  updateCount = (event, newValue) => {
    this.setState({ count: Number(newValue) });
  };


  render() {
    return (
      <Grid fluid>
        <Row middle="xs">
          <Col xs={11}>
            <Row middle="xs">
              <Col xs={1}>
                <SearchIcon
                  style={{ position: 'relative', top: 4 }}
                />
              </Col>
              <Col xs={11}>
                <AutoComplete
                  fullWidth
                  hintText="Search by name..."
                  onNewRequest={this.handleSearchRequest}
                  dataSource={[]}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={1}>
            <TextField
              fullWidth
              type="number"
              hintText="Count"
              defaultValue={this.state.count}
              onChange={this.updateCount}
            />
          </Col>
        </Row>
        <Row>
          <InteractiveTable
            ref="table"
            height={this.props.height - 48}
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
        </Row>
      </Grid>
    );
  }

  listeners = {
    reloadDuplicates: () => {
      this.props.actions.duplicate.fetch(this.state.count); // TODO make count a user option
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
      subject: bindActionCreators(subjects.creators, dispatch),
      subject_wikidata: bindActionCreators(wikiDataSubjects.creators, dispatch),
      subject_dbpedia: bindActionCreators(dbpediaSubjects.creators, dispatch),
      subject_temp: bindActionCreators(tempSubjects.creators, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(DuplicateTable));
