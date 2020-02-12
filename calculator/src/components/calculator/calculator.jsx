import React from 'react';
import CalculatorButtons from '../calculator-buttons';
import Lease from '../lease';
import Loan from '../loan';
import './calculator.scss';

const Calculator = ({ onChangeInput, onChangeTab, values, fields, isLoan }) => {
  const {
    zip,
    tradeInValue,
    downPayment,
    approxCreditScore,
    termForMonthLease,
    termForMonthLoan,
    annualMiles,
    apr,
  } = fields;
  const fieldsForLoan = {
    zip,
    tradeInValue,
    downPayment,
    apr,
    approxCreditScore,
    termForMonthLoan,
  };
  const fieldsForLease = {
    zip,
    tradeInValue,
    downPayment,
    approxCreditScore,
    termForMonthLease,
    annualMiles,
  };
  return (
    <div className="calculator">
      <CalculatorButtons isLoan={isLoan} onChangeTab={onChangeTab} />
      {isLoan ? (
        <Loan onChangeInput={onChangeInput} defaultValues={values} fields={fieldsForLoan} />
      ) : (
        <Lease onChangeInput={onChangeInput} defaultValues={values} fields={fieldsForLease} />
      )}
    </div>
  );
};

export default Calculator;
