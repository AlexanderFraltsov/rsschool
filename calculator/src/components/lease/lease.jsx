import React from 'react';
import InputWithMask from '../input-with-mask';
import InputSelect from '../input-select';

import './lease.scss';

const Lease = ({ onChangeInput, defaultValues, fields }) => {
  const { msrp } = defaultValues;
  const maxValue = msrp / 4;
  const {
    zip,
    tradeInValue,
    downPayment,
    approxCreditScore,
    termForMonthLease,
    annualMiles,
  } = fields;
  const inputs = [zip, tradeInValue, downPayment].map(el => {
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
  const selects = [approxCreditScore, termForMonthLease, annualMiles].map(el => {
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
    <form className="lease">
      <div className="lease--inputs">{inputs}</div>
      <div className="lease--selects">{selects}</div>
    </form>
  );
};

export default Lease;
