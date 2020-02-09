import React from 'react';
import CalculatorButtons from '../calculator-buttons';
import Lease from '../lease';
import './calculator.scss';

const Calculator = ({ onChangeInput, values }) => {
  return (
    <div className="calculator">
      <CalculatorButtons />
      <Lease onChangeInput={onChangeInput} defaultValues={values} />
    </div>
  );
};

export default Calculator;
