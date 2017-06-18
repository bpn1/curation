import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import SubjectEditor from './subject_editor';

class SubjectDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'new',
      id: null,
      load: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      this.setState({ load: true });
    }
    else if (!nextProps.open && this.props.open) {
      this.setState({ load: false });
    }
  }

  render() {
    // Capitalize first word of header
    const headerAction = this.state.type.replace(/\b\w/g, l => l.toUpperCase());

    return (
      <Dialog
        title={headerAction + ' subject'}
        titleStyle={{ color: this.state.titleColor }}
        modal={false}
        autoScrollBodyContent
        {...this.props}
      >
        <SubjectEditor
          id={this.state.id}
          load={this.state.load}
          enableReinitialize
          editorType={this.state.type}
          onRequestClose={this.props.onRequestClose}
        />
      </Dialog>
    );
  }
}

SubjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default SubjectDialog;
