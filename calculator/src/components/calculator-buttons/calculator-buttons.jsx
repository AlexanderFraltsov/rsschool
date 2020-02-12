import React from 'react';
import './calculator-buttons.scss';

const CalculatorButtons = ({ isLoan, onChangeTab }) => {
  const classLoan = isLoan ? 'btn-info' : 'btn-outline-secondary';
  const classLease = !isLoan ? 'btn-info' : 'btn-outline-secondary';
  const tabChange = e => {
    const newIsLoan = e.target.textContent === 'Loan';
    if (isLoan !== newIsLoan) onChangeTab(newIsLoan);
  };
  return (
    <div className="calculator--buttons">
      <button type="button" className={`btn ${classLoan}`} onClick={tabChange}>
        Loan
      </button>
      <button type="button" className={`btn ${classLease}`} onClick={tabChange}>
        Lease
      </button>
    </div>
  );
};

export default CalculatorButtons;
