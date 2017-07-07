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
    // TODO remove if not needed
    delete props.initialValue;

    return (
      <ChipInput
        {...props}
        value={this.state.tags}
        onRequestAdd={this.addTag}
        onRequestDelete={this.deleteTag}
      />
    );
  }
}

TagInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  input: PropTypes.shape({
    value: PropTypes.array
  })
};

TagInput.defaultProps = {
  input: {
    value: []
  }
};

export default TagInput;
