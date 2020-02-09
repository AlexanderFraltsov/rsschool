import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './lease-input.scss';

export default class LeaseInput extends Component {
  PropTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    mask: PropTypes.string,
    pattern: PropTypes.string,
  };

  state = { value: '' };

  onInputChange = e => {
    const { mask, onChangeInput, id, maxValue } = this.props;
    let newValue = e.target.value;
    if (mask && newValue.includes(mask)) {
      newValue = newValue.replace(mask, '');
    }
    newValue = +newValue;
    if (Number.isNaN(newValue)) return;
    if (maxValue > 0 && newValue > maxValue) return;

    this.setState({
      value: +newValue,
    });
    onChangeInput(+newValue, id);
  };

  render() {
    const { label, defaultValue, mask, pattern, id } = this.props;
    const { value } = this.state;
    return (
      <div className="text-input">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type="text"
          value={`${mask} ${value || defaultValue}`}
          onChange={this.onInputChange}
          placeholder={defaultValue}
          pattern={pattern}
          className="text-input--input"
        />
      </div>
    );
  }
}
