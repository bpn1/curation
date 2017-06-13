import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from 'redux-form/es/Field';
import FieldArray from 'redux-form/es/FieldArray';
import reduxForm from 'redux-form/es/reduxForm';
import connect from 'react-redux/es/connect/connect';

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

import { fetchSubject, addSubject, updateSubject } from '../actions/apiActions';

import TagInput from './tag_input';

const InputListItem = ({ index, children, ...props }) => (
  <ListItem key={'listItem' + index} innerDivStyle={{ padding: 0 }} disabled>
    { children }
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
      colors: props.muiTheme.palette,
      theme: props.muiTheme
    };
  }

  componentDidMount() {
    if (this.props.load) { this.reload(this.props.id); }
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
    if (id && this.props.editorType !== 'add') {
      this.props.fetchSubject(id);
    }
  }

  renderTextField = props => (
    <TextField
      errorText={props.touched && props.error}
      {...props}
    />
  );

  renderTagInput = props => (
    <TagInput
      hintText={props.label}
      errorText={props.touched && props.error}
      onChange={props.input.onChange}
      {...props}
    />
  );

  renderCheckbox = props => (
    <Checkbox
      label={props.label}
      checked={!!props.value}
      onCheck={props.input.onChange}
      {...props}
    />
  );

  renderSelectField = props => (
    <SelectField
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
      { fields.map((field, index) => // (inputWidth / 2.0) - 30 | (inputWidth / 2.0) - 10
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
      { error && <ListItem className="error">{ error }</ListItem> }
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
    if (this.props.editorType === 'edit') {
      this.props.updateSubject(newData);
    } else if (this.props.editorType === 'add') {
      this.props.addSubject(newData);
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
    let { width, pristine, submitting, handleSubmit, reset } = this.props;
    const { id } = this.state;
    width = width || 500;
    const fieldStyle = { width };

    return (
      <form onSubmit={handleSubmit(values => this.handleSubmit(values))}>
        <List>
          <ListItem
            primaryText="General"
            leftIcon={<GeneralIcon />}
            initiallyOpen
            primaryTogglesNestedList
            nestedItems={[
              <InputListItem index={0}>
                <Field
                  name="id" component={this.renderTextField}
                  hintStyle={{ whiteSpace: 'nowrap' }}
                  floatingLabelText="ID" floatingLabelFixed
                  hintText={id} disabled style={fieldStyle}
                />
              </InputListItem>,
              <InputListItem index={1}>
                <Field
                  name="name" component={this.renderTextField}
                  floatingLabelText="Name" floatingLabelFixed={false}
                  hintText="Enter a name..." style={fieldStyle}
                />
              </InputListItem>,
              <InputListItem index={2}>
                <Field
                  name="aliases" component={this.renderTagInput}
                  floatingLabelText="Aliases" floatingLabelFixed={false}
                  hintText="Type and press Enter to add..." style={fieldStyle}
                />
              </InputListItem>,
              <InputListItem index={3}>
                <Field
                  name="type" component={this.renderSelectField}
                  floatingLabelText="Type" floatingLabelFixed={false}
                  hintText="Select a subject type..." style={fieldStyle}
                >
                  <MenuItem value="business" primaryText="Business" />
                  <MenuItem value="organization" primaryText="Organization" />
                  <MenuItem value="country" primaryText="Country" />
                  <MenuItem value="city" primaryText="City" />
                  <MenuItem value="person" primaryText="Person" />
                </Field>
              </InputListItem>,
              <InputListItem index={4}>
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
              <FieldArray name="properties" component={this.renderTextFieldArray} inputWidth={width} />
            ]}
          />
        </List>
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
            onClick={(e) => { reset(e); this.props.onRequestClose(); }}
          />
        </div>
      </form>
    );
  }
}

SubjectEditor.propTypes = {
  editorType: PropTypes.oneOf(['edit', 'add']).isRequired,
  onRequestClose: PropTypes.func,
  load: PropTypes.bool,
  id: PropTypes.string,
  width: PropTypes.number,
  name: PropTypes.string,
  master: PropTypes.string
};

SubjectEditor.defaultProps = {
  onRequestClose: () => {}
};

// Redux connection for loading and saving subject data
const reduxConnectedForm = reduxForm({
  form: 'subjectEditorForm'
})(SubjectEditor);

// API connection (pull initial values from API reducer if not an 'add' dialog)
const apiConnectedForm = connect(
  (state, ownProps) => ({
    initialValues: state.api.editableSubjects[ownProps.id]
  }),
  { fetchSubject, addSubject, updateSubject } // bind loading and updating action creators
)(reduxConnectedForm);

// Connect to MaterialUI for theme & color information
const themedForm = muiThemable()(apiConnectedForm);

export default themedForm;
