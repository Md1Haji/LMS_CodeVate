import React from "react";

const Badge = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "badge";
  const variantClasses = {
    primary: "badge-primary",
    success: "badge-success",
    warning: "badge-warning",
    accent: "badge-accent",
    slate: "badge-slate",
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
