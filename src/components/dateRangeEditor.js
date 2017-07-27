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

import Field from 'redux-form/es/Field';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import DateIcon from 'material-ui/svg-icons/action/date-range';


// TODO refactor to be a single field that returns an array of two Dates (or an object)
class DateRangeEditor extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    const hasInitialValue = props.startDate !== null || props.endDate !== null;

    this.state = {
      isHidden: props.isHidden,
      startDate: hasInitialValue ? props.startDate : currentDate,
      endDate: hasInitialValue ? props.endDate : currentDate,
      hasValue: hasInitialValue
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.input.value.hasOwnProperty(length) && newProps.input.value.length === 2) {
      this.setState({ startDate: newProps.input.value[0], endDate: newProps.input.value[1] });
    }
  }

  // onChange => function(null: undefined, date: object) => void
  toggleDatePickers() {
    this.setState({ isHidden: !this.state.isHidden });
  }

  handleDateChange(fieldKey, date) {
    console.log('Date changed:', fieldKey, date);

    const newState = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      hasValue: true
    };
    newState[fieldKey] = date;
    console.log('New DateRangeEditor state:', newState);

    this.setState(newState);
    this.props.input.onChange([
      newState.startDate.toString(),
      newState.endDate.toString()
    ]);
  }

  render() {
    const datePickerDisplay = this.state.isHidden ? 'none' : 'inline';
    const iconColor = this.state.hasValue ? this.props.colors.positiveColor1 : this.props.colors.neutralColor1;
    const iconHoverColor = this.state.hasValue ? this.props.colors.positiveColor2 : this.props.colors.neutralColor2;

    return (
      <span>
        <IconButton
          onClick={() => this.toggleDatePickers()}
          tooltip="Edit temporal validity"
          touch
          tooltipPosition="top-center"
        >
          <DateIcon color={iconColor} hoverColor={iconHoverColor} />
        </IconButton>
        <DatePicker
          onChange={(nullEvt, date) => this.handleDateChange('startDate', date)}
          style={{ display: datePickerDisplay, marginRight: 10 }}
          textFieldStyle={{ width: 80, display: 'inline-block' }}
          floatingLabelText="Start date"
          container="inline"
          floatingLabelFixed={false}
        />
        <DatePicker
          onChange={(nullEvt, date) => this.handleDateChange('endDate', date)}
          errorText={this.props.meta.touched && this.props.meta.error}
          style={{ display: datePickerDisplay }}
          textFieldStyle={{ width: 80, display: 'inline-block' }}
          floatingLabelText="End date"
          container="inline"
          floatingLabelFixed={false}
        />
      </span>
    );
  }
}

DateRangeEditor.propTypes = {
  isHidden: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  colors: PropTypes.shape({
    positiveColor1: PropTypes.string,
    positiveColor2: PropTypes.string,
    neutralColor1: PropTypes.string,
    neutralColor2: PropTypes.string
  }),
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOf(PropTypes.arrayOf(String), PropTypes.string)
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    pristine: PropTypes.bool,
    error: PropTypes.string
  })
};

DateRangeEditor.defaultProps = {
  startDate: null,
  endDate: null,
  isHidden: true,
  colors: {
    positiveColor1: '#0a6',
    positiveColor2: '#2e8',
    neutralColor1: '#666',
    neutralColor2: '#aaa'
  },
  meta: {
    touched: false,
    error: ''
  }
};

export default DateRangeEditor;
