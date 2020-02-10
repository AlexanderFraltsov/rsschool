import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './input-with-mask.scss';

export default class InputWithMask extends Component {
  PropTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    mask: PropTypes.string,
  };

  state = { value: '' };

  onInputChange = e => {
    const { mask, onChangeInput, maxValue } = this.props;
    let { id } = this.props;
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
    if (id.includes('0')) id = id.replace('0', '');
    onChangeInput(+newValue, id);
  };

  render() {
    const { label, defaultValue, mask, id } = this.props;
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
          className="text-input--input"
        />
      </div>
    );
  }
}
