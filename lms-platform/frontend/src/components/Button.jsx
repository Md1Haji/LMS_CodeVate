import React from "react";

const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "btn";
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    ghost: "btn-ghost",
    accent: "btn-accent",
  };
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="inline-block animate-spin mr-2">⏳</span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
