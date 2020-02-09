import React, { Component } from 'react';
import Calculator from '../calculator';

import './app.scss';

export default class App extends Component {
  state = {
    values: {
      zip: localStorage.getItem('zip') || '000000',
      tradeInValue: localStorage.getItem('tradeInValue') || 0,
      downPayment: localStorage.getItem('downPayment') || 0,
      approxCreditScore: localStorage.getItem('approxCreditScore') || 750,
      annualMiles: localStorage.getItem('annualMiles') || 12000,
      termForMonth: localStorage.getItem('termForMonth') || 36,
      msrp: 35000,
    },
  };

  getCreditScoreValue = approxCreditScore => {
    if (approxCreditScore >= 750) return 0.95;
    if (approxCreditScore >= 700 && approxCreditScore < 750) return 1;
    if (approxCreditScore >= 640 && approxCreditScore < 700) return 1.05;
    return 1.2;
  };

  getMonthlyPaymentLease = ({
    approxCreditScore,
    annualMiles,
    tradeInValue,
    downPayment,
    termForMonth,
    msrp,
  }) => {
    const creditScore = this.getCreditScoreValue(approxCreditScore);
    return (
      ((msrp - tradeInValue - downPayment) * annualMiles * creditScore) /
      (10000 * termForMonth)
    ).toFixed();
  };

  onChangeInput = (value, id) => {
    localStorage.setItem(`${id}`, value);
    this.setState(({ values }) => {
      console.log(values);
      const newItem = { [`${id}`]: value };
      const newData = { ...values, ...newItem };
      return {
        values: newData,
      };
    });
  };

  render() {
    const { values } = this.state;
    const { msrp } = values;
    return (
      <div className="app">
        <Calculator onChangeInput={this.onChangeInput} values={values} />
        <div className="info">
          <div className="info--summary">
            <p>
              MSRP:
              {msrp}
            </p>
            <p>Est. Loan Payment</p>
            <p>
              Est. Lease Payment:
              {this.getMonthlyPaymentLease(values)}
            </p>
          </div>
          <div className="info--car">Toyota</div>
        </div>
      </div>
    );
  }
}
