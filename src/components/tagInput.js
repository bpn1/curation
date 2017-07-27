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
import ChipInput from 'material-ui-chip-input';

class TagInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: props.input.value
    };

    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.input.value;
    if (value && value !== this.state.tags) {
      this.setState({ tags: value });
    }
  }

  addTag(tag) {
    const tags = [...this.state.tags, tag];
    this.setState({ tags });
    this.props.onChange(tags);
  }

  deleteTag(tag, index) {
    const tags = [...this.state.tags];

    if (tags.length > index) {
      tags.splice(index, 1);
      this.setState({ tags });
    }

    this.props.onChange(tags);
  }

  render() {
    const props = Object.assign({}, this.props);
    delete props.input;
    delete props.meta;
    delete props.initialValue;

    const value = this.state.tags instanceof Array ? this.state.tags : [];

    return (
      <ChipInput
        {...props}
        value={value}
        onRequestAdd={this.addTag}
        onRequestDelete={this.deleteTag}
      />
    );
  }
}

TagInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
  })
};

TagInput.defaultProps = {
  input: {
    value: []
  }
};

export default TagInput;
