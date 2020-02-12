import React from 'react';

import './error-message.scss';

const ErrorMessage = ({ errorMsg }) => {
  return <div className="error-message alert-danger">{errorMsg}</div>;
};

export default ErrorMessage;
