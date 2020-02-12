import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './input-with-mask.scss';

export default class InputWithMask extends Component {
  state = { value: '' };

  getNewValue = e => {
    const { mask } = this.props;
    let newValue = e.target.value;
    if (mask && newValue.includes(mask)) {
      newValue = newValue.replace(mask, '');
    }
    return +newValue;
  };

  onInputChange = e => {
    const { maxValue } = this.props;
    const newValue = this.getNewValue(e);
    if (Number.isNaN(newValue)) return;
    if (maxValue > 0 && newValue > maxValue) {
      console.log('error text');
      return;
    }

    this.setState({
      value: newValue,
    });
  };

  onBlur = e => {
    const newValue = this.getNewValue(e);
    const { onChangeInput } = this.props;
    let { id } = this.props;
    if (id.includes('0')) id = id.replace('0', '');
    onChangeInput(newValue, id);
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
          onBlur={this.onBlur}
          placeholder={defaultValue}
          className="text-input--input"
        />
      </div>
    );
  }
}

InputWithMask.propTypes = {
  label: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
