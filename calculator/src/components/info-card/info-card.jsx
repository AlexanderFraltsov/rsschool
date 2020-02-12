import React from 'react';
import './info-card.scss';

const InfoCard = ({ msrp, monthlyPayment, taxes, vehicleName, dealer }) => {
  const { name, phone, rating } = dealer;
  return (
    <div className="info">
      <div className="info--summary">
        <p>
          MSRP:
          {` ${msrp}`}
        </p>
        <p>
          Taxes:
          {` ${taxes} $`}
        </p>
        <p>
          Monthly payment:
          {` ${monthlyPayment} $`}
        </p>
        <p>
          Vehicle name:
          {` ${vehicleName}`}
        </p>
        <p>
          Dealer name:
          {` ${name}`}
        </p>
        <p>
          Dealer phone number:
          {` ${phone}`}
        </p>
        <p>
          Dealer rating:
          {` ${rating}`}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
