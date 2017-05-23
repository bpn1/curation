import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

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
    // Capitalize first word of header
    let headerAction = this.state.type.replace(/\b\w/g, l => l.toUpperCase());

    return (
      <Dialog
        title={headerAction + " subject"}
        modal={false}
        autoScrollBodyContent={true}
        {...this.props}>
        <SubjectEditor id={this.state.id} editorType={this.state.type} onRequestClose={this.props.onRequestClose} />
      </Dialog>
    );
  }
}

SubjectDialog.propTypes = {
  type: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default SubjectDialog;
