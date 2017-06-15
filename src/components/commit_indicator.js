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
import FontIcon from 'material-ui/FontIcon';

import InteractiveTable from './interactive_table';

const changeCountStyle = {
  marginRight: 8,
  fontSize: 20,
  fontWeight: 'normal'
};

function isNotEmpty(obj) {
  return Object.keys(obj).length > 0;
}

function materialIcon(iconName, color) {
  return <FontIcon className="material-icons" color={color}>{iconName}</FontIcon>;
}

class CommitIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      createdCount: 0,
      updatedCount: 0,
      deletedCount: 0,
      created: {},
      updated: {},
      deleted: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.created) {
      this.setState({
        created: nextProps.created,
        createdCount: Object.keys(nextProps.created).length
      });
    }
    if (nextProps.updated) {
      this.setState({
        updated: nextProps.updated,
        updatedCount: Object.keys(nextProps.updated).length
      });
    }
    if (nextProps.deleted) {
      this.setState({
        deleted: nextProps.deleted,
        deletedCount: Object.keys(nextProps.deleted).length
      });
    }
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  renderDetails() {
    return (
      <div>
        {isNotEmpty(created) &&
        <div>
          <div>{this.state.createdCount} subjects created</div>
          <ul>
            {isNotEmpty(created) && Object.values(created).map(subject =>
              <li>{subject.name}</li>
            )}
          </ul>
        </div>}
        {isNotEmpty(updated) &&
        <div>
          <div>{this.state.updatedCount} subjects updated</div>
          <ul>
            {Object.values(updated).map(subject =>
              <li>{subject.name}</li>
            )}
          </ul>
        </div>}
        {isNotEmpty(deleted) &&
        <div>
          <div>{this.state.deletedCount} subjects deleted</div>
          <ul>
            {isNotEmpty(deleted) && Object.values(deleted).map(subject =>
              <li>{subject.name}</li>
            )}
          </ul>
        </div>}
      </div>
    );
  }

  addIcon = materialIcon('add_box', this.props.muiTheme.palette.positiveColor1);
  warningIcon = materialIcon('warning');
  updateIcon = materialIcon('mode_edit', this.props.muiTheme.palette.primary1Color);
  deleteIcon = materialIcon('delete', this.props.muiTheme.palette.negativeColor1);

  render() {
    const { created, updated, deleted } = this.state;
    const { createdCount, updatedCount, deletedCount } = this.state;
    const totalCount = createdCount + updatedCount + deletedCount;

    const headers = [
      { key: 'id', name: 'ID' },
      { key: 'name', name: 'Name' },
      { key: 'aliases', name: 'Aliases' },
      { key: 'category', name: 'Category' },
      { key: 'properties', name: 'Properties' },
      { key: 'relations', name: 'Relations' }
    ];

    const hiddenColumns = ['id', 'aliases', 'category', 'relations'];

    return (
      <div>
        <FlatButton
          onTouchTap={this.handleTouchTap}
        >
          <Grid fluid>
            <Row middle="xs">
              {this.addIcon}
              <span style={{
                ...changeCountStyle,
                color: this.props.muiTheme.palette.positiveColor1
              }}
              >{this.state.createdCount}</span>
              {this.updateIcon}
              <span style={{
                ...changeCountStyle,
                color: this.props.muiTheme.palette.primary1Color
              }}
              >{this.state.updatedCount}</span>
              {this.deleteIcon}
              <span style={{
                ...changeCountStyle,
                color: this.props.muiTheme.palette.negativeColor1
              }}
              >{this.state.deletedCount}</span>
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
            <ListItem
              primaryText={createdCount + ' created subjects'}
              style={{ color: this.props.muiTheme.palette.positiveColor1 }}
              leftIcon={this.addIcon}
              initiallyOpen={false}
              primaryTogglesNestedList
              nestedItems={[
                <InteractiveTable
                  headers={headers}
                  hiddenColumns={hiddenColumns}
                  data={Object.values(created)}
                  muiTheme={this.props.muiTheme}
                  expandKey="id"
                  height={250}
                />
              ]}
            />
            <ListItem
              primaryText={updatedCount + ' updated subjects'}
              style={{ color: this.props.muiTheme.palette.primary1Color }}
              leftIcon={this.updateIcon}
              initiallyOpen={false}
              primaryTogglesNestedList
              nestedItems={[
                <InteractiveTable
                  headers={headers}
                  hiddenColumns={hiddenColumns}
                  data={Object.values(updated)}
                  muiTheme={this.props.muiTheme}
                  expandKey="id"
                  height={250}
                />
              ]}
            />
            <ListItem
              primaryText={deletedCount + ' deleted subjects'}
              style={{ color: this.props.muiTheme.palette.negativeColor1 }}
              leftIcon={this.deleteIcon}
              initiallyOpen={false}
              primaryTogglesNestedList
              nestedItems={[
                <InteractiveTable
                  headers={headers}
                  hiddenColumns={hiddenColumns}
                  data={Object.values(deleted)}
                  muiTheme={this.props.muiTheme}
                  expandKey="id"
                  height={250}
                />
              ]}
            />
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    created: state.subject.created,
    updated: state.subject.updated,
    deleted: state.subject.deleted,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(CommitIndicator));
