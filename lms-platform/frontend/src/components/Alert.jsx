import React from "react";

const Alert = ({
  variant = "info",
  title,
  children,
  onClose,
  className = "",
  ...props
}) => {
  const variantClasses = {
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
    info: "alert-info",
  };

  return (
    <div
      className={`alert ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <div className="flex-between">
        <div>
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          {children && <p>{children}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-lg font-bold hover:opacity-70"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
