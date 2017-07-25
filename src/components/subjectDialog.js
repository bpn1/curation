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
import Dialog from 'material-ui/Dialog';

import SubjectEditor from './subjectEditor';

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
