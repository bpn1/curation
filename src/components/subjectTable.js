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
import { Col, Grid, Row } from 'react-flexbox-grid';

import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';
import muiThemable from 'material-ui/styles/muiThemeable';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import GraphIcon from 'material-ui/svg-icons/social/share';
import EditIcon from 'material-ui/svg-icons/image/edit';
import MapIcon from 'material-ui/svg-icons/maps/place';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import SearchIcon from 'material-ui/svg-icons/action/search';

import InteractiveTable from './interactiveTable';
import SubjectDialog from './subjectDialog';
import { subjects } from '../ducks/subjectDuck';
import { statuses } from '../ducks/apiDuck';

class SubjectTable extends Component {
  constructor(props) {
    super(props);

    const defaultHiddenColumns = ['master', 'datasource', 'id', 'aliases', 'category', 'relations'];

    this.state = {
      tableData: [],
      hiddenColumns: defaultHiddenColumns,
      hiddenColumnsVal: defaultHiddenColumns.join(', '),
      extractedProperties: [],
      extractedPropertiesVal: '',
      editorOpen: false,
      deleteConfirmationOpen: false,
      multipleDeletions: false,
      toBeDeletedNames: [],
      count: 500,
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
    if (nextProps.tableData && nextProps.tableData !== this.props.tableData) {
      this.setState({
        tableData: this.extractProperties(nextProps.tableData, this.state.extractedProperties)
      });
    }

    if (nextProps.loading !== null) {
      this.setState({
        refreshStatus: nextProps.loading ? 'loading' : 'hide'
      });
    }
  }

  extractProperties(tableData, extractedProperties) {
    if (extractedProperties.length === 0) return tableData;

    return tableData.map((subject) => {
      const extractedSubject = Object.assign({}, subject);
      if (!subject.properties) return subject;
      extractedProperties.forEach((prop) => {
        if (prop.key) prop = prop.key;
        if (!subject.hasOwnProperty(prop)) {
          extractedSubject[prop] = subject.properties.hasOwnProperty(prop) && subject.properties[prop] instanceof Array
            ? subject.properties[prop].join('; ') : null;
        }
      });

      return extractedSubject;
    });
  }

  handleSearchRequest = (searchInput) => {
    this.props.actions.subject.findByName(searchInput, this.state.count);
  };

  styles = {
    cogIcon: {
      color: '#aaa',
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

  listeners = {
    handleSelectionChange: (selectedRows) => {
      this.setState({ selectedRows });
    },
    reloadSubjects: () => {
      this.props.actions.subject.fetchOnlyMaster();
    },
    addSubject: () => {
      this.refs.subjectDialog.setState({ id: null, type: 'new' });
      this.setState({ editorOpen: true });
    },
    editSelectedSubject: () => {
      if (this.state.selectedRows.length !== 1) {
        console.error("Edit button clicked although there wasn't exactly 1 subject selected! Button should be hidden!");
        return;
      }

      const id = this.state.selectedRows[0].id;
      this.refs.subjectDialog.setState({ id: id, type: 'database' });
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
      this.props.actions.subject.delete(this.state.selectedRows);

      this.listeners.closeDeleteConfirmation();
    },
    showSettings: () => {
      this.setState({ settingsOpen: true });
    },
    closeSettings: () => {
      this.setState({ settingsOpen: false });
    },
    saveSettings: () => {
      // TODO save settings to browser's localStorage
      const { extractedPropertiesVal, hiddenColumnsVal } = this.state;
      const hiddenColumns = hiddenColumnsVal.split(',').map(str => str.trim().toLowerCase());
      const extractedProperties = extractedPropertiesVal.split(',')
        .map(str => str.trim().toLowerCase())
        .filter(str => str.length > 0)
        .map(prop => ({ key: prop, name: prop }));
      const tableData = this.extractProperties(this.props.tableData, extractedProperties);
      this.setState({ tableData, hiddenColumns, extractedProperties });
      this.listeners.closeSettings();
    },
    hiddenColumnsChanged: (event) => {
      this.setState({ hiddenColumnsVal: event.target.value });
    },
    extractedPropertiesChanged: (event) => {
      this.setState({ extractedPropertiesVal: event.target.value });
    },
    showSelectionGraph: () => {
      const selectedIDs = this.state.selectedRows.map(row => row.id);
      window.location.hash = '#/graphs?nodes=' + selectedIDs.join(',');
    },
    updateCount: (event, newValue) => {
      this.setState({ count: Number(newValue) });
    },
    showOnMap: () => {
      if (this.state.selectedRows.length !== 1) {
        console.error('Wrong number of rows selected for showOnMap, expected 1!');
        return;
      }

      let mapUrl = 'http://maps.google.com/maps?z=15&t=m&q=';

      const props = this.state.selectedRows[0].properties;
      if (props && props.geo_coords && props.geo_coords.length >= 1) {
        const [lat, lng] = props.geo_coords[0].split(';');
        mapUrl += 'loc:' + lat + '+' + lng; // also adapt here if new URL scheme is used
      } else if (props && (props.geo_street || props.geo_postal || props.geo_city || props.geo_country)) {
        mapUrl += encodeURIComponent([props.geo_street, props.geo_postal, props.geo_city, props.geo_country].join(' '));
      } else {
        mapUrl += encodeURIComponent(this.state.selectedRows[0].name);
      }

      window.open(mapUrl, '_blank');
    }
  };

  render() {
    const colors = this.props.muiTheme.palette;

    const buttonBarHeight = 48;

    const selectionCount = this.state.selectedRows.length;
    const showSelectionButtons = selectionCount > 0;
    const showSingleSelectionButtons = selectionCount === 1;

    return (
      <Grid fluid>
        <Row between="xs">
          <Col>
            {this.props.showNameFilter && <Row middle="xs">
              <Col xs={8}>
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
              <Col xs={2}>
                <TextField
                  fullWidth
                  type="number"
                  hintText="Count"
                  defaultValue={this.state.count}
                  onChange={this.listeners.updateCount}
                />
              </Col>
            </Row>}
          </Col>
          <Col>
            <CustomButton
              tooltip="Edit selected"
              visible={showSingleSelectionButtons}
              onClick={this.listeners.editSelectedSubject}
            >
              <EditIcon color={colors.interactiveColor1} hoverColor={colors.interactiveColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Show on map"
              visible={showSingleSelectionButtons}
              onClick={this.listeners.showOnMap}
            >
              <MapIcon color={colors.secondInteractiveColor1} hoverColor={colors.secondInteractiveColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Delete selected"
              visible={showSelectionButtons}
              onClick={this.listeners.openDeleteConfirmationIfSelected}
            >
              <DeleteIcon color={colors.negativeColor1} hoverColor={colors.negativeColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Show selection graph"
              visible={showSelectionButtons}
              onClick={this.listeners.showSelectionGraph}
            >
              <GraphIcon color={colors.neutralColor1} hoverColor={colors.neutralColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Add new"
              onClick={this.listeners.addSubject}
            >
              <AddIcon color={colors.positiveColor1} hoverColor={colors.positiveColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Reload"
              onClick={this.listeners.reloadSubjects}
            >
              <RefreshIcon color={colors.interactiveColor1} hoverColor={colors.interactiveColor2} />
            </CustomButton>
            <CustomButton
              tooltip="Settings"
              onClick={this.listeners.showSettings}
            >
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
                top={-50}
              />
            </div>
            <InteractiveTable
              height={this.props.height - buttonBarHeight}
              ref="table"
              expandKey={'id'}
              headers={this.props.headers.concat(this.state.extractedProperties)}
              data={this.state.tableData}
              muiTheme={this.props.muiTheme}
              onSelectionChange={this.listeners.handleSelectionChange}
              hiddenColumns={this.state.hiddenColumns}
            /></Col>
        </Row>
        <SubjectDialog
          ref="subjectDialog"
          open={this.state.editorOpen}
          onRequestClose={this.listeners.closeEditor}
        />
        <Dialog
          ref="deleteConfirmationDialog"
          open={this.state.deleteConfirmationOpen}
          title="Are you sure?"
          modal
          actions={[
            <FlatButton
              label="Cancel"
              primary={false}
              onTouchTap={this.listeners.closeDeleteConfirmation}
              keyboardFocused
            />,
            <FlatButton label="Submit" primary onTouchTap={this.listeners.deleteSelectedSubjects} />
          ]}
        >
          Do you really want to delete the selected subject{this.state.multipleDeletions ? ' entries' : ''}?<br />
          This will result in the loss of {this.state.multipleDeletions ? 'these subjects' : 'this subject'}:
          <ul>{this.state.toBeDeletedNames.map(name => <li key={name}>{name}</li>)}</ul>
        </Dialog>
        <Dialog
          ref="settingsDialog"
          open={this.state.settingsOpen}
          backgroundColor
          title={<div><span style={this.styles.cogIcon}>⚙</span>️ Table Settings</div>}
          modal
          actions={[
            <FlatButton label="Cancel" primary={false} onTouchTap={this.listeners.closeSettings} />,
            <FlatButton label="Save" primary onTouchTap={this.listeners.saveSettings} keyboardFocused />
          ]}
        >
          <TextField
            style={{ maxWidth: '100%', width: '100%' }}
            ref="setting_hiddenColumns"
            hintText="Enter column names, comma-separated..."
            floatingLabelText="Hidden columns"
            floatingLabelFixed={false}
            value={this.state.hiddenColumnsVal}
            onChange={this.listeners.hiddenColumnsChanged}
          />
          <TextField
            style={{ maxWidth: '100%', width: '100%' }}
            ref="setting_extractedProperties"
            hintText="Enter extracted property names, comma-separated..."
            floatingLabelText="Extracted properties"
            floatingLabelFixed={false}
            value={this.state.extractedPropertiesVal}
            onChange={this.listeners.extractedPropertiesChanged}
          />
        </Dialog>
      </Grid>
    );
  }
}

SubjectTable.propTypes = {
  height: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  fetchOnMount: PropTypes.bool,
  showNameFilter: PropTypes.bool,
  headers: PropTypes.array,
  tableData: PropTypes.array,
  loading: PropTypes.bool,
  muiTheme: PropTypes.shape({
    palette: PropTypes.object
  }).isRequired,
  actions: PropTypes.shape({
    subject: PropTypes.shape({
      delete: PropTypes.func,
      findByName: PropTypes.func,
      fetchOnlyMaster: PropTypes.func
    })
  }).isRequired
};

SubjectTable.defaultProps = {
  fetchOnMount: true,
  showNameFilter: true,
  headers: [
    { key: 'master', name: 'Master' },
    { key: 'datasource', name: 'Datasource' },
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    { key: 'aliases', name: 'Aliases' },
    { key: 'category', name: 'Category' },
    { key: 'properties', name: 'Properties' },
    { key: 'relations', name: 'Relations' }
  ],
  tableData: [],
  loading: false
};

const CustomButton = ({ tooltip, onClick, children, visible = true }) => (visible &&
  <IconButton
    tooltip={tooltip}
    touch
    tooltipPosition="top-center"
    onClick={onClick}
  >
    {children}
  </IconButton>);

/* connection to Redux */
function mapStateToProps(state, ownProps) {
  const duplicateScoresLoaded =
    state.duplicate.store && state.duplicate.store.candidateScores
    && Object.keys(state.duplicate.store.candidateScores).length > 0;

  // load candidateScores from duplicate.store
  let tableData = state.subject.entities;
  if (tableData && ownProps.type === 'duplicates' && duplicateScoresLoaded) {
    tableData.forEach(subject => subject.candidateScore = state.duplicate.store.candidateScores[subject.id]);
  }

  if (ownProps.type === 'subjects') {
    tableData = tableData.filter(row => row.datasource === 'master');
  }

  const subjectFetchTag = 'curation/subject/FETCH';
  const subjectFindTag = 'curation/subject/FIND';
  const isLoading = state.subject.status[subjectFetchTag] === statuses.LOADING
    || state.subject.status[subjectFindTag] === statuses.LOADING;

  return {
    tableData: tableData,
    error: state.subject.error,
    loading: isLoading
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
