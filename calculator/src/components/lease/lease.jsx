import React, { Component } from 'react';
import InputWithMask from '../input-with-mask';
import InputSelect from '../input-select';

import './lease.scss';

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
  ];

  selects = [
    {
      id: 'approxCreditScore',
      label: 'Approx. Credit Score',
      availableValues: [600, 650, 700, 750, 800, 850, 900],
    },
    { id: 'termForMonthLease', label: 'Term (Month)', availableValues: [24, 36, 48] },
    {
      id: 'annualMiles',
      label: 'Annual Miles',
      availableValues: [10000, 12000, 15000],
    },
  ];

  render() {
    const { onChangeInput, defaultValues } = this.props;
    const { msrp } = defaultValues;
    const maxValue = msrp / 4;
    const inputs = this.inputs.map(el => {
      return (
        <InputWithMask
          key={el.id}
          id={el.id}
          label={el.label}
          defaultValue={defaultValues[el.id]}
          mask={el.mask}
          onChangeInput={onChangeInput}
          maxValue={el.max ? maxValue : 0}
        />
      );
    });
    const selects = this.selects.map(el => {
      return (
        <InputSelect
          key={el.id}
          id={el.id}
          label={el.label}
          defaultValue={defaultValues[el.id]}
          availableValues={el.availableValues}
          onChangeInput={onChangeInput}
        />
      );
    });

    return (
      <div className="lease">
        <div className="lease--inputs">{inputs}</div>
        <div className="lease--selects">{selects}</div>
      </div>
    );
  }
}
