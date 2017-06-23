import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from 'redux-form/es/Field';
import FieldArray from 'redux-form/es/FieldArray';
import reduxForm from 'redux-form/es/reduxForm';
import connect from 'react-redux/es/connect/connect';
import bindActionCreators from 'redux/es/bindActionCreators';

import LinearProgress from 'material-ui/LinearProgress';
import { Checkbox, SelectField, TextField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import uuid from 'uuid/v4';

import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import SaveIcon from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import PropsIcon from 'material-ui/svg-icons/action/build';
import GeneralIcon from 'material-ui/svg-icons/action/settings';
import muiThemable from 'material-ui/styles/muiThemeable';

import { statuses } from '../ducks/apiDuck';
import { subjects } from '../ducks/subjectDuck';

import TagInput from './tag_input';

const InputListItem = ({ children, ...props }) => (
  <ListItem innerDivStyle={{ padding: 0 }} disabled>
    {children}
  </ListItem>
);

class SubjectEditor extends Component {
  constructor(props) {
    super(props);

    // TODO do the UUID generation in Redux or in the backend
    // generate a new UUID if necessary
    const id = props.id ? props.id : uuid();
    this.state = {
      id,
      disabled: props.editorType === 'deleted',
      colors: props.muiTheme.palette,
      theme: props.muiTheme
    };
  }

  componentDidMount() {
    if (this.props.load) {
      this.reload(this.props.id);
    }
  }

  updateTheme(theme) {
    // add theme to state so it will adapt on the fly when the theme changes
    if (theme) {
      this.setState({
        colors: theme.palette,
        theme: theme
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateTheme(nextProps.muiTheme);

    // load prop transitioning to true
    if (nextProps.id !== this.props.id && nextProps.load) {
      this.reload(nextProps.id);
    }

    // reset form when new values arrive
    if (nextProps.initialValues && nextProps.initialValues !== this.props.initialValues) {
      this.props.reset();
    }
  }

  reload(id) {
    console.log('Load subject #', id);
    if (id && this.props.editorType !== 'new') {
      this.props.actions.subject.get(id);
    }
  }

  renderTextField = props => (
    <TextField
      errorText={props.touched && props.error}
      disabled={this.state.disabled}
      {...props}
    />
  );

  renderTagInput = props => (
    <TagInput
      disabled={this.state.disabled}
      hintText={props.label}
      errorText={props.touched && props.error}
      onChange={props.input.onChange}
      {...props}
    />
  );

  renderCheckbox = props => (
    <Checkbox
      disabled={this.state.disabled}
      label={props.label}
      checked={!!props.value}
      onCheck={props.input.onChange}
      {...props}
    />
  );

  renderSelectField = props => (
    <SelectField
      disabled={this.state.disabled}
      label={props.label}
      errorText={props.touched && props.error}
      {...props}
      onChange={props.input.onChange}
    />
  );

  renderTextFieldArray = ({ fields, meta: { error } }) => (
    <div>
      <FlatButton
        onClick={() => fields.push()}
        type="button"
        label="Add property"
        icon={<AddIcon color={this.state.colors.positiveColor1} hoverColor={this.state.colors.positiveColor2} />}
      />
      {fields.map((field, index) => // (inputWidth / 2.0) - 30 | (inputWidth / 2.0) - 10
        (<InputListItem index={index} key={index}>
          <Field
            name={`${field}.name`}
            type="text"
            component={this.renderTextField}
            style={{ marginRight: 10, maxWidth: '30%' }}
            placeholder={`Property Name #${index + 1}`}
          />
          <Field
            name={`${field}.value`}
            type="text"
            component={this.renderTextField}
            style={{ maxWidth: '40%' }}
            placeholder={`Property Value #${index + 1}`}
          />
          <IconButton
            onClick={() => fields.remove(index)}
            tooltip="Remove property"
            touch
            tooltipPosition="top-center"
          >
            <RemoveIcon color={this.state.colors.negativeColor1} hoverColor={this.state.colors.negativeColor2} />
          </IconButton>
        </InputListItem>)
      )}
      {error && <ListItem className="error">{error}</ListItem>}
    </div>
  );

  handleSubmit = (data) => {
    const newData = Object.assign({}, data);
    newData.id = this.state.id;

    // rework properties FieldArray into an object
    const newProps = {};
    if (data.hasOwnProperty('properties')) {
      data.properties.forEach((prop) => {
        newProps[prop.name] = prop.value;
      });
    }

    console.log('Updating subject #', this.state.id, ' with the data: ', data, ' and new properties:', newProps);

    newData.properties = newProps;

    // update an old subject or create a new one depending on the type of the editor (edit or add)
    if (this.props.editorType === 'database' || this.props.editorType === 'created' || this.props.editorType === 'updated') {
      this.props.actions.subject.update(newData);
    } else if (this.props.editorType === 'new') {
      this.props.actions.subject.create(newData);
    } else {
      console.error('No Redux action for the editorType ' + this.props.editorType + ' configured!');
    }

    this.props.onRequestClose();
  };

  styles = {
    checkBox: {
      paddingTop: 15,
      paddingBottom: 15
    }
  };

  render() {
    let { width, pristine, submitting, handleSubmit, reset, isLoading } = this.props;
    const { id } = this.state;
    width = width || 500;
    const fieldStyle = { width };

    return (
      <div>
        {isLoading && <LinearProgress mode="indeterminate" />}
        <form onSubmit={handleSubmit(values => this.handleSubmit(values))}>
          <List>
            <ListItem
              primaryText="General"
              leftIcon={<GeneralIcon />}
              initiallyOpen
              primaryTogglesNestedList
              nestedItems={[
                <InputListItem key={'listItem' + 0}>
                  <Field
                    name="id" component={this.renderTextField}
                    hintStyle={{ whiteSpace: 'nowrap' }}
                    floatingLabelText="ID" floatingLabelFixed
                    hintText={id} disabled style={fieldStyle}
                  />
                </InputListItem>,
                <InputListItem key={'listItem' + 1}>
                  <Field
                    name="name" component={this.renderTextField}
                    floatingLabelText="Name" floatingLabelFixed={false}
                    hintText="Enter a name..." style={fieldStyle}
                  />
                </InputListItem>,
                <InputListItem key={'listItem' + 2}>
                  <Field
                    name="aliases" component={this.renderTagInput}
                    floatingLabelText="Aliases" floatingLabelFixed={false}
                    hintText="Type and press Enter to add..." style={fieldStyle}
                  />
                </InputListItem>,
                <InputListItem key={'listItem' + 3}>
                  <Field
                    name="category" component={this.renderSelectField}
                    floatingLabelText="Category" floatingLabelFixed={false}
                    hintText="Select a subject category..." style={fieldStyle}
                  >
                    <MenuItem value="business" primaryText="Business" />
                    <MenuItem value="organization" primaryText="Organization" />
                    <MenuItem value="country" primaryText="Country" />
                    <MenuItem value="city" primaryText="City" />
                    <MenuItem value="person" primaryText="Person" />
                  </Field>
                </InputListItem>,
                <InputListItem key={'listItem' + 4}>
                  <Field
                    name="isMaster" label="Master node"
                    component={this.renderCheckbox} style={this.styles.checkBox}
                  />
                </InputListItem>
              ]}
            />
            <ListItem
              primaryText="Properties"
              leftIcon={<PropsIcon />}
              initiallyOpen={false}
              primaryTogglesNestedList
              nestedItems={[
                <FieldArray
                  key="fieldArrayProperties"
                  name="properties"
                  component={this.renderTextFieldArray}
                  inputWidth={width}
                />
              ]}
            />
          </List>
          {this.props.editorType !== 'deleted' &&
          <div>
            <RaisedButton
              style={{ marginRight: 10, marginTop: 10 }}
              label="Save"
              icon={<SaveIcon />}
              backgroundColor={this.props.muiTheme.palette.positiveColor1}
              type="submit"
              disabled={pristine || submitting}
            />
            <RaisedButton
              label="Cancel"
              icon={<DeleteIcon />}
              backgroundColor={this.props.muiTheme.palette.negativeColor1}
              disabled={pristine || submitting}
              onClick={(e) => {
                reset(e);
                this.props.onRequestClose();
              }}
            />
          </div>}
        </form>
      </div>
    );
  }
}

SubjectEditor.propTypes = {
  editorType: PropTypes.oneOf(['new', 'database', 'created', 'updated', 'deleted']).isRequired,
  onRequestClose: PropTypes.func,
  load: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  width: PropTypes.number,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  master: PropTypes.string
};

SubjectEditor.defaultProps = {
  onRequestClose: () => {
  },
  disabled: false,
  isLoading: true
};

// pull initial values from API reducer if not an 'new' dialog
function mapStateToProps(state, ownProps) {
  if (ownProps.editorType === 'new') {
    return { isLoading: false };
  }
  const subjectGetTag = 'curation/subject/GET';
  const isLoading = state.subject.status[subjectGetTag] === statuses.LOADING;

  return {
    initialValues: state.subject.editableSubjects[ownProps.id],
    isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      subject: bindActionCreators(subjects.creators, dispatch)
    }
  };
}

// Redux connection for loading and saving subject data
const reduxConnectedForm = reduxForm({
  form: 'subjectEditorForm'
})(SubjectEditor);

// API connection
const apiConnectedForm = connect(mapStateToProps, mapDispatchToProps)(reduxConnectedForm);

// Connect to MaterialUI for theme & color information
const themedForm = muiThemable()(apiConnectedForm);

export default themedForm;
