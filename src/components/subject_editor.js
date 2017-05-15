import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Checkbox, RadioButtonGroup, SelectField, TextField, Toggle, DatePicker
} from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import uuid from 'uuid/v4';

import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import muiThemable from 'material-ui/styles/muiThemeable';

import { fetchSubject, updateSubject } from '../actions/apiActions';

import TagInput from './tag_input';

class SubjectEditor extends Component {
  constructor(props) {
    super(props);

    // generate a new UUID if necessary
    let id = props.id ? props.id : uuid();
    this.state = { id };
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    if(this.state.id) {
      this.props.fetchSubject(this.state.id);
    }
  }

  handleSubmit(e) {
    if(this.state.id)
      this.props.updateSubject(this.state.id, data);
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
      onChange={tags => console.log(props)}
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
      onChange={(event, index, value) => props.onChange(value)} />
  );

  render() {
    let { width, pristine, submitting, handleSubmit, reset } = this.props;
    let { id } = this.state;
    width = width ? width : 500;
    let fieldStyle = { width };

    // TODO load initialValues like this: http://redux-form.com/6.0.0-alpha.4/examples/initializeFromState/

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
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
          <Field name="isMaster" component={this.renderCheckbox} style={fieldStyle} label="Master node" />
        </div>
        <div>
          <RaisedButton
            style={{marginRight: 10, marginTop: 10}}
            label="Save"
            icon={<SaveIcon />}
            backgroundColor={this.props.muiTheme.palette.positiveColor1}
            type="submit"
            disabled={pristine || submitting} />
          <RaisedButton
            label="Cancel"
            icon={<DeleteIcon/>}
            backgroundColor={this.props.muiTheme.palette.negativeColor1}
            disabled={pristine || submitting}
            onClick={reset} />
        </div>
      </form>
    );
  }
}

SubjectEditor.propTypes = {
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
    initialValues: state.api.subject // pull initial values from subject reducer
  }),
  { fetchSubject, updateSubject } // bind loading and updating action creators
)(reduxConnectedForm);

// Connect to MaterialUI for theme & color information
const themedForm = muiThemable()(apiConnectedForm);

export default themedForm;
