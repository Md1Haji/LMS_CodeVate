import React from "react";

const ProgressBar = ({
  value = 0,
  max = 100,
  showLabel = true,
  variant = "primary",
  className = "",
}) => {
  const percentage = (value / max) * 100;
  const variantClasses = {
    primary: "from-primary-500 to-primary-600",
    success: "from-success-500 to-success-600",
    warning: "from-warning-500 to-warning-600",
    accent: "from-accent-500 to-accent-600",
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="progress">
        <div
          className={`progress-fill bg-gradient-to-r ${variantClasses[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-slate-600 mt-2">{Math.round(percentage)}%</p>
      )}
    </div>
  );
};

export default ProgressBar;
