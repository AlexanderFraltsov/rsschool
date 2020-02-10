import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './input-buttons.scss';

export default class InputButtons extends Component {
  PropTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.number,
    availableValues: PropTypes.arrayOf(PropTypes.number),
  };

  onInputChange = e => {
    const { onChangeInput } = this.props;
    let { id } = this.props;
    const newValue = +e.target.value;
    if (id.includes('0')) id = id.replace('0', '');
    onChangeInput(newValue, id);
  };

  render() {
    const { label, defaultValue, availableValues, id } = this.props;
    const buttons = availableValues.map(buttonValue => {
      const isActive = +buttonValue === +defaultValue;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          type="button"
          className={`btn ${clazz}`}
          value={buttonValue}
          key={buttonValue}
          onClick={this.onInputChange}
        >
          {buttonValue}
        </button>
      );
    });

    return (
      <div id={id}>
        <p>{label}</p>
        <div className="button-row btn-group">{buttons}</div>
      </div>
    );
  }
}
