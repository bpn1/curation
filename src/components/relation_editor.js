import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from 'redux-form/es/Field';
import FieldArray from 'redux-form/es/FieldArray';
import reduxForm from 'redux-form/es/reduxForm';
import connect from 'react-redux/es/connect/connect';
import bindActionCreators from 'redux/es/bindActionCreators';

import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import SaveIcon from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import muiThemable from 'material-ui/styles/muiThemeable';

// import { subjects } from '../ducks/subjectDuck';
import graphDuck from '../ducks/graphDuck';
import DirectionToggle from './direction_toggle';
import DateRangeEditor from './date_range_editor';

const relationTypes = [
  'owningCompany',
  'division',
  'publisher',
  'parentCompany',
  'manufacturer',
  'subsidiary',
  'production',
  'equity',
  'assets',
  'assetUnderManagement',
  'successor',
  'predecessor'
];

class RelationEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: props.muiTheme.palette,
      theme: props.muiTheme,
      sourceKey: props.sourceKey,
      targetKey: props.targetKey
    };

    this.renderRelationArray = this.renderRelationArray.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  componentWillReceiveProps(nextProps) {
    const nextState = {};

    // reload if one of the edge keys has changed
    if (nextProps.sourceKey !== this.props.sourceKey || nextProps.targetKey !== this.props.targetKey) {
      this.reload();
      this.props.reset();
      nextState.sourceKey = nextProps.sourceKey;
      nextState.targetKey = nextProps.targetKey;
    }

    if (nextProps.sourceSubject) nextState.sourceSubject = nextProps.sourceSubject;
    if (nextProps.targetSubject) nextState.targetSubject = nextProps.targetSubject;

    this.setState(nextState);
  }

  reload() {
    console.log('Load relations for', this.state.sourceKey, '->', this.state.targetKey);
    // this.props.actions.subject.getSome([this.state.sourceKey, this.state.targetKey]);
    this.props.actions.graph.fetchRelations(this.state.sourceKey, this.state.targetKey);
  }

  handleSubmit(data) {
    console.log('TODO: Update relations for', this.state.sourceKey, '->', this.state.targetKey, ':', data);
    // TODO: this.props.actions.graph.updateRelations(data);
  }

  renderTextField = props => (
    <TextField
      errorText={props.meta.touched && props.meta.error}
      {...props}
    />
  );

  renderAutoCompleteField = props => (
    <AutoComplete
      errorText={props.meta.touched && props.meta.error}
      onUpdateInput={(searchInput, dataSource, params) => props.input.onChange(searchInput)}
      searchText={this.state.searchInput}
      filter={AutoComplete.caseInsensitiveFilter}
      openOnFocus
      dataSource={props.dataSource}
      dataSourceConfig={{
        text: 'name',
        value: 'key'
      }}
      maxSearchResults={15}
      {...props}
    />
  );

  renderRelationArray({ fields, meta: { error }, errorColor }) {
    return (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <FlatButton
            onClick={() => fields.push()}
            type="button"
            label="Add relation"
            icon={<AddIcon color={this.state.colors.positiveColor1} hoverColor={this.state.colors.positiveColor2} />}
          />
        </li>
        { fields.map((field, index) => (
          <li key={index}>
            <Field
              name={`${field}.isForward`}
              component={DirectionToggle}
            />
            <Field
              name={`${field}.type`}
              // component={this.renderAutoCompleteField}
              // dataSource={relationTypes}
              component={this.renderTextField}
              fullWidth
              style={{ marginRight: 10, width: '35%' }}
              floatingLabelText="Relation type"
              floatingLabelFixed={false}
            />
            <Field
              name={`${field}.value`}
              type="text"
              component={this.renderTextField}
              style={{ width: '20%' }}
              floatingLabelText="Value"
              floatingLabelFixed={false}
            />
            <IconButton
              onClick={() => fields.remove(index)}
              tooltip="Remove relation"
              touch
              tooltipPosition="top-center"
            >
              <RemoveIcon color={this.state.colors.negativeColor1} hoverColor={this.state.colors.negativeColor2} />
            </IconButton>
            <Field
              name={`${field}.validityDateRange`}
              component={DateRangeEditor}
              iconColor={this.state.positiveColor1}
              iconHoverColor={this.state.positiveColor2}
            />
          </li>
        ))}
        { error && (<div><br /><span style={this.styles.errorStyle(errorColor)}>{ error }</span></div>) }
      </ul>
    );
  }

  styles = {
    errorStyle: errorColor => ({
      padding: 5,
      margin: 5,
      borderRadius: 5,
      border: '1px solid rgb(' + errorColor + ')',
      backgroundColor: 'rgba(' + errorColor + ', 0.5)'
    }),
    name: {
      whiteSpace: 'nowrap'
    },
    uuid: {
      whiteSpace: 'nowrap',
      fontFamily: 'monospace',
      fontSize: '10pt'
    }
  };

  render() {
    const { width, pristine, submitting, handleSubmit, reset } = this.props;
    const { sourceSubject, targetSubject } = this.state;
    const sourceName = sourceSubject && sourceSubject.name && sourceSubject.name.length > 0
      ? sourceSubject.name : 'None';
    const targetName = targetSubject && sourceSubject.name && sourceSubject.name.length > 0
      ? targetSubject.name : 'None';

    return (
      <form onSubmit={handleSubmit(values => this.handleSubmit(values))}>
        <h1>Relations</h1>
        <p style={this.styles.name}>{sourceName}<br />&rArr; {targetName}</p>
        <p>
          <span style={this.styles.uuid}>{this.state.sourceKey}</span><br />
          &rArr; <span style={this.styles.uuid}>{this.state.targetKey}</span>
        </p>
        <div>
          <FieldArray
            name="relations"
            component={this.renderRelationArray}
            errorColor="220, 60, 0"
          />
        </div>
        <div>
          <RaisedButton
            style={{ marginRight: 10, marginTop: 10 }}
            label="Save"
            icon={<SaveIcon />}
            backgroundColor={this.state.colors.positiveColor1}
            type="submit"
            disabled={pristine || submitting}
          />
          <RaisedButton
            label="Cancel"
            icon={<DeleteIcon />}
            backgroundColor={this.state.colors.negativeColor1}
            disabled={pristine || submitting}
            onClick={(e) => { reset(e); }}
          />
        </div>
      </form>
    );
  }
}

RelationEditor.propTypes = {
  sourceKey: PropTypes.string.isRequired,
  targetKey: PropTypes.string.isRequired,
  sourceSubject: PropTypes.object,
  targetSubject: PropTypes.object,
  actions: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired
};

RelationEditor.defaultProps = {
  sourceSubject: { name: 'None' },
  targetSubject: { name: 'None' }
};

// Form validation function
function validate(values) {
  const errors = {};

  // TODO check for duplicate edges (same direction and type)
  if (values.relations && values.relations.length !== 0) {
    const relationsArrayErrors = [];
    values.relations.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.type || member.type.length === 0) {
        memberErrors.type = 'Required';
        relationsArrayErrors[memberIndex] = memberErrors;
      }
      if (member && member.validityDateRange && member.validityDateRange.length === 2 &&
        new Date(member.validityDateRange[0]) > new Date(member.validityDateRange[1])) {
        memberErrors.validityDateRange = 'Must be after start date';
        relationsArrayErrors[memberIndex] = memberErrors;
      }
      return memberErrors;
    });
    if (relationsArrayErrors.length) {
      errors.relations = relationsArrayErrors;
    }
  }

  return errors;
}

// Redux connection for loading and saving subject data
const reduxConnectedForm = reduxForm({
  form: 'relationEditor',
  validate
})(RelationEditor);

// API connection (pull initial values from the graph duck)
// TODO maybe use createSelector from package reselect to freeze relations object
// TODO see: https://marmelab.com/blog/2017/02/06/react-is-slow-react-is-fast.html (Ctrl+F reselect)
function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      relations: state.graph.relations[[ownProps.sourceKey, ownProps.targetKey]]
    },
    sourceSubject: state.graph.subjects[ownProps.sourceKey],
    targetSubject: state.graph.subjects[ownProps.targetKey]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      // subject: bindActionCreators(subjects.creators, dispatch),
      graph: bindActionCreators(graphDuck.creators, dispatch)
    }
  };
}

const apiConnectedForm = connect(mapStateToProps, mapDispatchToProps)(reduxConnectedForm);

// Connect to MaterialUI for theme & color information
const themedForm = muiThemable()(apiConnectedForm);

export default themedForm;