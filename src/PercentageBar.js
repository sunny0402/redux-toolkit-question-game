import React from "react";

const PercentageBar = ({ percentage }) => {
  const optionProgress = percentage;
  const optionRemainder = 100 - optionProgress;
  return (
    <div className="percentage-bar">
      <div className="progress" style={{ width: `${optionProgress}%` }} />
      <div className="remainder" style={{ width: `${optionRemainder}%` }} />
      <div className="percentage-value">{percentage}%</div>
    </div>
  );
};

export default PercentageBar;
