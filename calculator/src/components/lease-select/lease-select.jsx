import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './lease-select.scss';

export default class LeaseSelect extends Component {
  PropTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.number,
    availableValues: PropTypes.arrayOf(PropTypes.number),
  };

  state = { value: '' };

  onInputChange = e => {
    const { onChangeInput, id } = this.props;
    const newValue = +e.target.value;
    this.setState({
      value: newValue,
    });
    onChangeInput(newValue, id);
  };

  render() {
    const { label, defaultValue, availableValues, id } = this.props;
    const { value } = this.state;
    const options = availableValues.map(el => {
      return (
        <option value={el} key={el}>
          {el}
        </option>
      );
    });

    return (
      <div className="select-input">
        <label htmlFor={id}>{label}</label>
        <select
          value={value || defaultValue}
          id={id}
          onChange={this.onInputChange}
          placeholder={defaultValue}
          className="select-input--input"
        >
          {options}
        </select>
      </div>
    );
  }
}
