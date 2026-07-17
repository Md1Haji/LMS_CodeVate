import React from "react";

const Card = ({
  variant = "default",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "card";
  const variantClasses = {
    default: "",
    premium: "card-premium",
    glass: "glass",
    gradient: "gradient-premium",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
