import React from "react";

const Input = React.forwardRef(({
  label,
  error,
  type = "text",
  placeholder = "",
  className = "",
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`input ${error ? "input-error" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-accent-600 text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
