import React, { Component } from 'react';
import Calculator from '../calculator';
import InfoCard from '../info-card';
import fakeData from '../utils/fakeData';

import './app.scss';

const { MSRP, vehicleName, dealer } = fakeData;
const ZIP_ID = 'zip';
const ZIP_LABEL = 'Home ZIP Code';
const ZIP_MASK = '';
const ZIP_DEFAULT_VALUE = 111111;
const TRADE_IN_ID = 'tradeInValue';
const TRADE_IN_LABEL = 'Trade-in Value';
const TRADE_IN_MASK = '$';
const TRADE_IN_DEFAULT_VALUE = 0;
const DOWN_PAYMENT_ID = 'downPayment';
const DOWN_PAYMENT_LABEL = 'Down Payment';
const DOWN_PAYMENT_MASK = '$';
const DOWN_PAYMENT_DEFAULT_VALUE = 0;
const CREDIT_SCORE_ID = 'approxCreditScore';
const CREDIT_SCORE_LABEL = 'Approx. Credit Score';
const CREDIT_SCORE_AVAILABLE_VALUES = [600, 650, 700, 750, 800, 850, 900];
const CREDIT_SCORE_DEFAULT_VALUE = 750;
const TERM_LEASE_ID = 'termForMonthLease';
const TERM_LEASE_LABEL = 'Term (Month)';
const TERM_LEASE_AVAILABLE_VALUES = [24, 36, 48];
const TERM_LEASE_DEFAULT_VALUE = 36;
const TERM_LOAN_ID = 'termForMonthLoan';
const TERM_LOAN_LABEL = TERM_LEASE_LABEL;
const TERM_LOAN_AVAILABLE_VALUES = [12, 24, 36, 48, 72, 84];
const TERM_LOAN_DEFAULT_VALUE = 24;
const MILES_ID = 'annualMiles';
const MILES_LABEL = 'Annual Miles';
const MILES_AVAILABLE_VALUES = [10000, 12000, 15000];
const MILES_DEFAULT_VALUE = 12000;
const APR_ID = 'apr';
const APR_LABEL = 'Estimated APR';
const APR_MASK = '%';
const APR_DEFAULT_VALUE = 0;

export default class App extends Component {
  state = {
    values: {
      [ZIP_ID]: +sessionStorage.getItem(ZIP_ID) || ZIP_DEFAULT_VALUE,
      [TRADE_IN_ID]: +sessionStorage.getItem(TRADE_IN_ID) || TRADE_IN_DEFAULT_VALUE,
      [DOWN_PAYMENT_ID]: +sessionStorage.getItem(DOWN_PAYMENT_ID) || DOWN_PAYMENT_DEFAULT_VALUE,
      [CREDIT_SCORE_ID]: +sessionStorage.getItem(CREDIT_SCORE_ID) || CREDIT_SCORE_DEFAULT_VALUE,
      [MILES_ID]: +sessionStorage.getItem(MILES_ID) || MILES_DEFAULT_VALUE,
      [TERM_LEASE_ID]: +sessionStorage.getItem(TERM_LEASE_ID) || TERM_LEASE_DEFAULT_VALUE,
      [TERM_LOAN_ID]: +sessionStorage.getItem(TERM_LOAN_ID) || TERM_LOAN_DEFAULT_VALUE,
      [APR_ID]: +sessionStorage.getItem(APR_ID) || APR_DEFAULT_VALUE,
      msrp: MSRP,
    },
    fields: {
      [ZIP_ID]: { id: ZIP_ID, label: ZIP_LABEL, mask: ZIP_MASK },
      [TRADE_IN_ID]: { id: TRADE_IN_ID, label: TRADE_IN_LABEL, mask: TRADE_IN_MASK, max: true },
      [DOWN_PAYMENT_ID]: {
        id: DOWN_PAYMENT_ID,
        label: DOWN_PAYMENT_LABEL,
        mask: DOWN_PAYMENT_MASK,
        max: true,
      },
      [CREDIT_SCORE_ID]: {
        id: CREDIT_SCORE_ID,
        label: CREDIT_SCORE_LABEL,
        availableValues: CREDIT_SCORE_AVAILABLE_VALUES,
      },
      [TERM_LEASE_ID]: {
        id: TERM_LEASE_ID,
        label: TERM_LEASE_LABEL,
        availableValues: TERM_LEASE_AVAILABLE_VALUES,
      },
      [MILES_ID]: { id: MILES_ID, label: MILES_LABEL, availableValues: MILES_AVAILABLE_VALUES },
      [APR_ID]: { id: APR_ID, label: APR_LABEL, mask: APR_MASK },
      [TERM_LOAN_ID]: {
        id: TERM_LOAN_ID,
        label: TERM_LOAN_LABEL,
        availableValues: TERM_LOAN_AVAILABLE_VALUES,
      },
    },
    isLoan: sessionStorage.getItem('isLoan') || true,
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

  getTaxes = zip => {
    const arr = `${zip}`.split('').map(num => num * 11);
    arr.length = 2;
    return arr;
  };

  onChangeInput = (value, id) => {
    const { values: oldValues } = this.state;
    const { [`${id}`]: oldValue } = oldValues;
    if (value === oldValue) return;
    sessionStorage.setItem(`${id}`, value);
    this.setState(({ values }) => {
      const newItem = { [`${id}`]: value };
      const newData = { ...values, ...newItem };
      return {
        values: newData,
      };
    });
  };

  onChangeTab = isLoan => {
    sessionStorage.setItem('isLoan', isLoan);
    this.setState({ isLoan });
  };

  render() {
    const { values, fields, isLoan } = this.state;
    const { msrp, zip } = values;
    const leasePayment = this.getMonthlyPaymentLease(values);
    const loanPayment = this.getMonthlyPaymentLoan(values);
    const taxes = this.getTaxes(zip);
    return (
      <div className="app">
        <Calculator
          onChangeInput={this.onChangeInput}
          onChangeTab={this.onChangeTab}
          values={values}
          fields={fields}
          isLoan={isLoan}
        />
        <InfoCard
          msrp={msrp}
          monthlyPayment={isLoan ? loanPayment : leasePayment}
          vehicleName={vehicleName}
          dealer={dealer}
          taxes={taxes}
        />
      </div>
    );
  }
}
