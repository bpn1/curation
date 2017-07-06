import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';

class TagInput extends Component {
  constructor(props) {
    super(props);
    console.log('taginput props', props);

    this.state = {
      tags: props.input.value,
      formValue: ''
    };
  }

  // automatically update tags if new ones are received
  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value) {
      console.log('TODO enable setting TagInput => New values: ', nextProps.input.value);
      this.setState({ tags: nextProps.input.value });
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
    } else {
      console.error("Couldn't delete tag", tag, 'at index', index,
        'because tag list only contains', tags.length, 'elements!');
    }

    this.props.onChange(tags);
  }

  render() {
    const props = Object.assign({}, this.props);
    delete props.input;
    delete props.meta;
    // TODO remove if not needed
    delete props.initialValue;

    // ChipInput used controlled mode => value, onRequestAdd & onRequestDelete (stace syncing)
    return (
      <ChipInput
        {...props}
        value={this.state.tags}
        onRequestAdd={(chip) => {
          console.log('RequestAdd Tag', chip);
          this.addTag(chip);
        }}
        onRequestDelete={(chip, index) => {
          console.log('RequestDelete Tag', chip, index);
          this.deleteTag(chip, index);
        }}
      />
    );
  }
}

TagInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array
};

TagInput.defaultProps = {
  value: []
};

export default TagInput;
