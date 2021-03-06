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

import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { red600, orange600, grey600, teal600, yellow600 } from 'material-ui/styles/colors';
import HistoryIcon from 'material-ui/svg-icons/action/history';
import RestoreIcon from 'material-ui/svg-icons/action/settings-backup-restore';
import ChangeIcon from 'material-ui/svg-icons/action/change-history';
import ZoomIcon from 'material-ui/svg-icons/action/zoom-in';
import MergeIcon from 'material-ui/svg-icons/editor/merge-type';
import ExploreIcon from 'material-ui/svg-icons/action/explore';
import BusinessIcon from 'material-ui/svg-icons/places/business-center';
import PCIcon from 'material-ui/svg-icons/hardware/desktop-windows';
import PersonIcon from 'material-ui/svg-icons/social/person';

import versionDuck from '../ducks/versionDuck';

const dataSourceIcons = {
  merging: <MergeIcon color={orange600} />,
  implisense: <BusinessIcon color="rgb(74, 138, 184)" />,
  wikidata: <ExploreIcon color="rgb(51, 153, 103)" />,
  dbpedia: <PCIcon color="rgb(220, 180, 30)" />,
  human: <PersonIcon color="rgb(200, 70, 30)" />,
  none: <HistoryIcon color={grey600} />
};

const topAndBottomPadding = 2 * 8;

class VersionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      versions: props.versions,
      height: props.height,
      dialogOpen: false,
      selectedVersion: null
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.restoreCurrentVersion = this.restoreCurrentVersion.bind(this);
    this.findPreviousVersion = this.findPreviousVersion.bind(this);
    this.computeDifference = this.computeDifference.bind(this);
    this.showDifference = this.showDifference.bind(this);
  }

  componentDidMount() {
    this.props.actions.version.fetch();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.versions) this.setState({ versions: nextProps.versions });
    if (nextProps.height) this.setState({ height: nextProps.height });
  }

  formatDate(date) {
    return date.toDateString() + ' ' + date.toTimeString().split(' ')[0];
  }

  processVersions(versions) {
    const groupedVersions = {};
    versions.forEach((version) => {
      const date = new Date(version.timestamp);
      const currentDate = new Date();
      const daysBetween = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 3600 * 24));
      let day = [0, date.toDateString()];

      if (daysBetween === 0) day = [1, 'Today'];
      else if (daysBetween === 1) day = [2, 'Yesterday'];
      else if (daysBetween < 7) day = [3, 'This week'];
      else if (daysBetween < 30) day = [4, 'This month'];
      else if (daysBetween < 60) day = [5, 'Last month'];
      else if (daysBetween < 365) day = [6, 'This year'];
      else if (daysBetween < 730) day = [7, 'Last year'];
      else day = [8, 'A long time ago'];

      groupedVersions[day] = groupedVersions[day] || [];
      groupedVersions[day].push(version);
    });

    // sort each group descendingly by timestamp
    Object.keys(groupedVersions).forEach((day) => {
      groupedVersions[day] = groupedVersions[day]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    });

    return groupedVersions;
  }

  processProgramName(program) {
    const splitProgram = program.split('_');
    if (splitProgram.length === 3) splitProgram.pop();
    return splitProgram.join(' ');
  }

  chooseDataSourceIcon(datasource) {
    const source = datasource[0].split('_')[0];
    const icon = dataSourceIcons[source];
    if (!icon) return dataSourceIcons.none;
    return icon;
  }

  openDialog(version) {
    this.setState({
      selectedVersion: version,
      dialogOpen: true
    });
  }

  closeDialog() {
    this.setState({
      selectedVersion: null,
      dialogOpen: false
    });
  }

  restoreCurrentVersion() {
    // start Spark job for restoring
    this.props.actions.version.restoreVersion(this.state.selectedVersion.version);
    this.closeDialog();
  }

  findPreviousVersion(newVersion) {
    // TODO add to filter: && version.subjecttable === 'subject'
    const olderVersions = this.state.versions
      .filter(version => new Date(version.timestamp) < new Date(newVersion.timestamp))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // if there are no older versions, use the same key (caught in job)
    return olderVersions.length > 0 ? olderVersions[0] : newVersion;
  }

  // navigate to /versiondiff to show VersionDiffCard
  showDifference() {
    const newVersion = this.state.selectedVersion;
    const oldVersion = this.findPreviousVersion(newVersion);
    window.location.hash = '#/versiondiff?versions=' + oldVersion.version + ',' + newVersion.version;
    this.closeDialog();
  }

  computeDifference() {
    // start Spark job for calculating the VersionDiff
    const newVersion = this.state.selectedVersion;
    const oldVersion = this.findPreviousVersion(newVersion);
    this.props.actions.version.computeDifference(newVersion.version, oldVersion.version);
    this.closeDialog();
  }

  render() {
    const versions = this.processVersions(this.state.versions);
    const sortedVersionKeys = Object.keys(versions)
      .sort((a, b) => a[0] - b[0]);

    let selectedVersionName = '';
    let selectedVersionID = '';
    let selectedVersionDate = '';
    let selectedVersionDataSources = '';
    let selectedVersionTable = '';

    if (this.state.selectedVersion) {
      selectedVersionName = this.processProgramName(this.state.selectedVersion.program);
      selectedVersionID = this.state.selectedVersion.version;
      selectedVersionDate = this.formatDate(new Date(this.state.selectedVersion.timestamp));
      selectedVersionDataSources = this.state.selectedVersion.datasources.join(', ');
      selectedVersionTable = this.state.selectedVersion.subjecttable || 'none';
    }

    return (
      <div>
        <List style={{ height: this.state.height - topAndBottomPadding, overflowY: 'auto' }}>
          { sortedVersionKeys.map(day => (
            <span key={day}>
              <Subheader>{day.split(',')[1]}</Subheader>
              <Divider />
              { versions[day].map(version => (
                <ListItem
                  key={version.version}
                  leftIcon={this.chooseDataSourceIcon(version.datasources)}
                  primaryText={this.processProgramName(version.program)}
                  secondaryText={<p>{ this.formatDate(new Date(version.timestamp)) }</p>}
                  secondaryTextLines={1}
                  onTouchTap={() => this.openDialog(version)}
                />
              ))}
            </span>
          )) }
        </List>
        <Dialog
          open={this.state.dialogOpen}
          title={'Version: ' + selectedVersionName}
          modal
          actions={[
            <FlatButton label="Cancel" primary={false} onTouchTap={this.closeDialog} keyboardFocused />,
            <FlatButton
              label="Show difference"
              icon={<ZoomIcon />}
              style={{ color: yellow600, marginLeft: 5 }}
              onTouchTap={this.showDifference}
            />,
            <FlatButton
              label="Compute difference"
              icon={<ChangeIcon />}
              style={{ color: teal600, marginLeft: 5 }}
              onTouchTap={this.computeDifference}
            />,
            <FlatButton
              label="Restore"
              icon={<RestoreIcon />}
              style={{ color: red600, marginLeft: 5 }}
              onTouchTap={this.restoreCurrentVersion}
            />
          ]}
        >
          Timestamp: <b>{selectedVersionDate}</b><br />
          Version ID: <b>{selectedVersionID}</b><br />
          Data source: <b>{selectedVersionDataSources}</b><br />
          Target table: <b>{selectedVersionTable}</b><br />
          <br />
          Do you really want to restore the selected version?<br />
          This will result in resetting all subject data to the values available at the time!<br />
          However, it will not delete the history entries.
        </Dialog>
      </div>
    );
  }
}
VersionList.propTypes = {
  versions: PropTypes.array,
  actions: PropTypes.shape({
    version: PropTypes.shape({
      fetch: PropTypes.func,
      restoreVersion: PropTypes.func,
      computeDifference: PropTypes.func
    })
  }).isRequired,
  height: PropTypes.number
};

VersionList.defaultProps = {
  versions: [],
  height: 800
};

/* connection to Redux */
function mapStateToProps(state) {
  return {
    versions: state.version.entities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      version: bindActionCreators(versionDuck.creators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VersionList);
