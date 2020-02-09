import React, { Component } from 'react';
import LeaseInput from '../lease-input';
import LeaseSelect from '../lease-select';

import './lease.scss';

export default class Lease extends Component {
  inputs = [
    { id: 'zip', label: 'Home ZIP Code', defaultValue: '000000', mask: '', pattern: '[0-9]{6}' },
    {
      id: 'tradeInValue',
      label: 'Trade-in Value',
      defaultValue: 0,
      mask: '$',
      pattern: '[0-9]{1,}',
      max: true,
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      defaultValue: 0,
      mask: '$',
      pattern: '[0-9]{1,}',
      max: true,
    },
  ];

  selects = [
    {
      id: 'approxCreditScore',
      label: 'Approx. Credit Score',
      defaultValue: 750,
      availableValues: [600, 650, 700, 750, 800, 850, 900],
    },
    { id: 'termForMonth', label: 'Term (Month)', defaultValue: 36, availableValues: [24, 36, 48] },
    {
      id: 'annualMiles',
      label: 'Annual Miles',
      defaultValue: 12000,
      availableValues: [10000, 12000, 15000],
    },
  ];

  render() {
    const { onChangeInput, defaultValues } = this.props;
    const { msrp } = defaultValues;
    const maxValue = msrp / 4;
    const inputs = this.inputs.map(el => {
      return (
        <LeaseInput
          key={el.id}
          id={el.id}
          label={el.label}
          defaultValue={defaultValues[el.id]}
          mask={el.mask}
          pattern={el.pattern}
          onChangeInput={onChangeInput}
          maxValue={el.max ? maxValue : 0}
        />
      );
    });
    const selects = this.selects.map(el => {
      return (
        <LeaseSelect
          key={el.id}
          id={el.id}
          label={el.label}
          defaultValue={el.defaultValue}
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
