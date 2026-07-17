import React from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className = "",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex-center">
      <div
        className={`${sizeClasses[size]} bg-white rounded-lg shadow-xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-96 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && <div className="p-6 border-t border-slate-200">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
