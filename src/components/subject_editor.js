import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from 'redux-form/es/Field';
import FieldArray from 'redux-form/es/FieldArray';
import reduxForm from 'redux-form/es/reduxForm';
import connect from 'react-redux/es/connect/connect';

import { Checkbox, SelectField, TextField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import uuid from 'uuid/v4';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import SaveIcon from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import muiThemable from 'material-ui/styles/muiThemeable';

import { fetchSubject, addSubject, updateSubject } from '../actions/apiActions';

import TagInput from './tag_input';

class SubjectEditor extends Component {
  constructor(props) {
    super(props);

    // TODO do the UUID generation in Redux or in the backend
    // generate a new UUID if necessary
    let id = props.id ? props.id : uuid();
    this.state = {
      id,
      colors: props.muiTheme.palette,
      theme: props.muiTheme
    };
  }

  componentDidMount() {
    this.reload();
  }

  updateTheme(theme) {
    // add theme to state so it will adapt on the fly when the theme changes
    if(theme) {
      this.setState({
        colors: theme.palette,
        theme: theme
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateTheme(nextProps.muiTheme);
  }

  reload() {
    if (this.state.id) {
      this.props.fetchSubject(this.state.id);
    }
  }
  
  renderTextField = props => (
    <TextField
      errorText={props.touched && props.error}
      {...props} />
  );

  renderTagInput = props => (
    <TagInput
      hintText={props.label}
      errorText={props.touched && props.error}
      onChange={tags => props.onChange(tags)}
      {...props} />
  );

  renderCheckbox = props => (
    <Checkbox
      label={props.label}
      checked={!!props.value}
      onCheck={props.onChange}
      {...props} />
  );

  renderSelectField = props => (
    <SelectField
      label={props.label}
      errorText={props.touched && props.error}
      {...props}
      onChange={props.onChange} />
  );

  renderTextFieldArray = ({ fields, meta: { error } }) => (
    <div>
      <h3>Properties</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <FlatButton
            onClick={() => fields.push()}
            type="button"
            label="Add property"
            icon={<AddIcon color={this.state.colors.positiveColor1} hoverColor={this.state.colors.positiveColor2} />} />
        </li>
        { fields.map((field, index) =>
          <li key={index}>
            <Field
              name={`${field}.name`}
              type="text"
              component={this.renderTextField}
              style={{marginRight: 10}}
              placeholder={`Property Name #${index + 1}`} />
            <Field
              name={`${field}.value`}
              type="text"
              component={this.renderTextField}
              placeholder={`Property Value #${index + 1}`} />
            <IconButton
              onClick={() => fields.remove(index)}
              tooltip="Remove property"
              touch={true}
              tooltipPosition="top-center">
              <RemoveIcon color={this.state.colors.negativeColor1} hoverColor={this.state.colors.negativeColor2} />
            </IconButton>
          </li>
        )}
        { error && <li className="error">{ error }</li> }
      </ul>
    </div>
  );

  handleSubmit = (data) => {
    let newData = Object.assign({}, data);
    newData.id = this.state.id;

    // rework properties FieldArray into an object
    let newProps = {};

    if(data.hasOwnProperty("properties")) {
      data.properties.forEach(prop => {
        newProps[prop.name] = prop.value;
      });
    }

    console.log("Updating subject #", this.state.id, " with the data: ", data, " and new properties:", newProps);

    newData.properties = newProps;

    // update an old subject or create a new one depending on the type of the editor (edit or add)
    if(this.props.editorType === "edit")
      this.props.updateSubject(newData);
    else if(this.props.editorType === "add")
      this.props.addSubject(newData);
    else
      console.error("No Redux action for the editorType " + this.props.editorType + " configured!");

    this.props.onRequestClose();
  };

  render() {
    let { width, pristine, submitting, handleSubmit, reset } = this.props;
    let { id } = this.state;
    width = width ? width : 500;
    let fieldStyle = { width };

    // TODO load initialValues like this: http://redux-form.com/6.0.0-alpha.4/examples/initializeFromState/

    return (
      <form onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
        <div>
          <Field name="id" component={this.renderTextField}
                 floatingLabelText="ID" floatingLabelFixed={true}
                 hintText={id} disabled={true} style={fieldStyle} />
        </div>
        <div>
          <Field name="name" component={this.renderTextField}
                 floatingLabelText="Name" floatingLabelFixed={false}
                 hintText="Enter a name..." style={fieldStyle} />
        </div>
        <div>
          <Field name="aliases" component={this.renderTagInput}
                 floatingLabelText="Aliases" floatingLabelFixed={false}
                 hintText="Type and press Enter to add..." style={fieldStyle} />
        </div>
        <div>
          <Field name="type" component={this.renderSelectField}
                 floatingLabelText="Type" floatingLabelFixed={false}
                 hintText="Select a subject type..." style={fieldStyle}>
            <MenuItem value="business" primaryText="Business" />
            <MenuItem value="organization" primaryText="Organization" />
            <MenuItem value="country" primaryText="Country" />
            <MenuItem value="city" primaryText="City" />
            <MenuItem value="person" primaryText="Person" />
          </Field>
        </div>
        <div>
          <FieldArray name="properties" component={this.renderTextFieldArray} />
        </div>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Field name="isMaster" component={this.renderCheckbox} style={fieldStyle} label="Master node" />
        </div>
        <div>
          <RaisedButton
            style={{ marginRight: 10, marginTop: 10 }}
            label="Save"
            icon={<SaveIcon />}
            backgroundColor={this.props.muiTheme.palette.positiveColor1}
            type="submit"
            disabled={pristine || submitting} />
          <RaisedButton
            label="Cancel"
            icon={<DeleteIcon />}
            backgroundColor={this.props.muiTheme.palette.negativeColor1}
            disabled={pristine || submitting}
            onClick={(e) => { reset(e); this.props.onRequestClose(); }} />
        </div>
      </form>
    );
  }
}

SubjectEditor.propTypes = {
  editorType: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  id: PropTypes.string,
  width: PropTypes.number,
  name: PropTypes.string,
  master: PropTypes.string
};

// Redux connection for loading and saving subject data
const reduxConnectedForm = reduxForm({
  form: 'subjectEditorForm'
})(SubjectEditor);

// API connection
const apiConnectedForm = connect(
  state => ({
    initialValues: state.api.editableSubject // pull initial values from API reducer
  }),
  { fetchSubject, addSubject, updateSubject } // bind loading and updating action creators
)(reduxConnectedForm);

// Connect to MaterialUI for theme & color information
const themedForm = muiThemable()(apiConnectedForm);

export default themedForm;
