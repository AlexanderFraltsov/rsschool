import React from 'react';
import CalculatorButtons from '../calculator-buttons';
import Lease from '../lease';
import Loan from '../loan';
import './calculator.scss';

const Calculator = ({ onChangeInput, values }) => {
  return (
    <div className="calculator">
      <CalculatorButtons />
      <Lease onChangeInput={onChangeInput} defaultValues={values} />
      <Loan onChangeInput={onChangeInput} defaultValues={values} />
    </div>
  );
};

export default Calculator;
