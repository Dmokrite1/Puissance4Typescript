import React from "react";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <div style={{ color: "red", fontSize: 20, marginTop: 20 }}>{message}</div>;
};

export default ErrorMessage;
