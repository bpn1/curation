import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import SubjectEditor from './subject_editor';

class SubjectDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'add',
      id: null
    }
  }

  render() {
    let headerAction = this.state.type.replace(/\b\w/g, l => l.toUpperCase());

    // TODO change modal to true once it works properly and there are action buttons

    return (
      <Dialog
        title={headerAction + " subject"}
        modal={false}
        autoScrollBodyContent={true}
        {...this.props}>
        <SubjectEditor id={this.state.id}  />
      </Dialog>
    )
  }
}

SubjectDialog.propTypes = {
  type: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default SubjectDialog;
