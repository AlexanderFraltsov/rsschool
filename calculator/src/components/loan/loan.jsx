import React, { Component } from 'react';
import InputWithMask from '../input-with-mask';
import InputButtons from '../input-buttons';

import './loan.scss';

export default class Lease extends Component {
  inputs = [
    { id: 'zip', label: 'Home ZIP Code', mask: '' },
    {
      id: 'tradeInValue',
      label: 'Trade-in Value',
      mask: '$',
      max: true,
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      mask: '$',
      max: true,
    },
    { id: 'apr', label: 'Estimated APR', mask: '%' },
  ];

  buttonRows = [
    {
      id: 'approxCreditScore',
      label: 'Approx. Credit Score',
      availableValues: [600, 650, 700, 750, 800, 850, 900],
    },
    {
      id: 'termForMonthLoan',
      label: 'Term (Month)',
      availableValues: [12, 24, 36, 48, 72, 84],
    },
  ];

  render() {
    console.log(this.buttonRows);

    const { onChangeInput, defaultValues } = this.props;
    const { msrp } = defaultValues;
    const maxValue = msrp / 4;
    const inputs = this.inputs.map(el => {
      return (
        <InputWithMask
          key={el.id}
          id={`${el.id}0`}
          label={el.label}
          defaultValue={defaultValues[el.id]}
          mask={el.mask}
          onChangeInput={onChangeInput}
          maxValue={el.max ? maxValue : 0}
        />
      );
    });
    const buttonRows = this.buttonRows.map(el => {
      return (
        <InputButtons
          key={el.id}
          id={`${el.id}0`}
          label={el.label}
          defaultValue={defaultValues[el.id]}
          availableValues={el.availableValues}
          onChangeInput={onChangeInput}
        />
      );
    });

    return (
      <div className="loan">
        <div className="loan--inputs">{inputs}</div>
        <div className="loan--buttons">{buttonRows}</div>
      </div>
    );
  }
}
