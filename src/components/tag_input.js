import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';

class TagInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      formValue: ""
    };

    //this.parseJSONAndUpdate(props);
  }

  // automatically update tags if new ones are received
  componentWillReceiveProps(nextProps) {
    this.parseJSONAndUpdate(nextProps);
  }

  addTag(tag) {
    const tags = [...this.state.tags, tag];
    this.updateTagsAndSerialize(tags);
  }

  deleteTag(tag, index) {
    let tags = [...this.state.tags];

    if(tags.length > index) {
      tags.splice(index, 1);
      this.updateTagsAndSerialize(tags);
    } else {
      console.error("Couldn't delete tag", tag, "at index", index,
        "because tag list only contains",tags.length,"elements!");
    }
  }

  parseJSONAndUpdate(props) {
    const value = props.value || props.initialValue || null;
    if(!value) return;

    try {
      // const tags = JSON.parse(value);
      const tags = value;
      this.setState({
        formValue: value,
        tags
      });
    } catch(e) {
      console.error("Couldn't parse JSON for tags", value, e);
    }
  }

  updateTagsAndSerialize(tags) {
    const formValue = JSON.stringify(tags);
    this.setState({ tags, formValue });
  }

  render() {
    const props = Object.assign({}, this.props);
    delete props.input;
    delete props.meta;
    // TODO remove if not needed
    delete props.initialValue;

    // TODO add other side of synchronization (onRequestAdd, onRequestDelete)
    // TODO correctly connect aliases to redux-form, doesn't change e.g. dirty state
    // DONE use controlled mode => value, onRequestAdd & onRequestDelete so the state can be properly synced

    return (
      <ChipInput
        value={this.state.tags}
        onRequestAdd={(chip) => {
          console.log("RequestAdd Tag", chip);
          this.addTag(chip);
        }}
        onRequestDelete={(chip, index) => {
          console.log("RequestDelete Tag", chip, index);
          this.deleteTag(chip, index)
        }}
        {...props} />
    );
  }
}

TagInput.propTypes = {
  value: PropTypes.string
};

export default TagInput;
