import React from "react";

const ErrorNotice = (props) => {
  return (
    <div className="error-notice">
      <p>{props.message}</p>
      <button onClick={props.clearError}>x</button>
    </div>
  );
};

export default ErrorNotice;
