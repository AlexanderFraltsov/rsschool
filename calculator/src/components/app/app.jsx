import React, { Component } from 'react';
import Calculator from '../calculator';

import './app.scss';

export default class App extends Component {
  state = {
    values: {
      zip: sessionStorage.getItem('zip') || '000000',
      tradeInValue: +sessionStorage.getItem('tradeInValue') || 0,
      downPayment: +sessionStorage.getItem('downPayment') || 0,
      approxCreditScore: +sessionStorage.getItem('approxCreditScore') || 750,
      annualMiles: +sessionStorage.getItem('annualMiles') || 12000,
      termForMonthLease: +sessionStorage.getItem('termForMonthLease') || 36,
      termForMonthLoan: +sessionStorage.getItem('termForMonthLoan') || 24,
      apr: +sessionStorage.getItem('apr') || 0,
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
    termForMonthLease,
    msrp,
  }) => {
    const creditScore = this.getCreditScoreValue(approxCreditScore);

    return (
      ((msrp - tradeInValue - downPayment) * annualMiles * creditScore) /
      (10000 * termForMonthLease)
    ).toFixed();
  };

  getMonthlyPaymentLoan = ({
    approxCreditScore,
    apr,
    tradeInValue,
    downPayment,
    termForMonthLoan,
    msrp,
  }) => {
    const creditScore = this.getCreditScoreValue(approxCreditScore);

    return (
      ((msrp - tradeInValue - downPayment) * creditScore * apr) /
      (100 * termForMonthLoan)
    ).toFixed();
  };

  onChangeInput = (value, id) => {
    sessionStorage.setItem(`${id}`, value);
    this.setState(({ values }) => {
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
    const leasePayment = this.getMonthlyPaymentLease(values);
    const loanPayment = this.getMonthlyPaymentLoan(values);
    console.log(leasePayment);
    return (
      <div className="app">
        <Calculator onChangeInput={this.onChangeInput} values={values} />
        <div className="info">
          <div className="info--summary">
            <p>
              MSRP:
              {msrp}
            </p>
            <p>
              Est. Loan Payment:
              {loanPayment}
            </p>
            <p>
              Est. Lease Payment:
              {leasePayment}
            </p>
          </div>
          <div className="info--car">Toyota</div>
        </div>
      </div>
    );
  }
}
