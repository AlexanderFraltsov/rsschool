import React from 'react';
import InputWithMask from '../input-with-mask';
import InputButtons from '../input-buttons';

import './loan.scss';

const Loan = ({ onChangeInput, defaultValues, fields }) => {
  const { zip, tradeInValue, downPayment, apr, approxCreditScore, termForMonthLoan } = fields;
  const inputs = [zip, tradeInValue, downPayment, apr].map(el => {
    return (
      <InputWithMask
        key={el.id}
        id={`${el.id}0`}
        label={el.label}
        defaultValue={defaultValues[el.id]}
        mask={el.mask}
        onChangeInput={onChangeInput}
        maxValue={el.max}
        errorMsg={el.errorMsg}
      />
    );
  });
  const buttonRows = [approxCreditScore, termForMonthLoan].map(el => {
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
      <form className="loan--inputs">{inputs}</form>
      <div className="loan--buttons">{buttonRows}</div>
    </div>
  );
};

export default Loan;
