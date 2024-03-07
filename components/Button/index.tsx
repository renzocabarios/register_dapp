import React from "react";

interface IButton {
  children: any;
  onClick: any;
  disabled?: boolean;
}

function Button({ children, onClick, disabled }: IButton) {
  return (
    <button
      className={`${
        disabled ?? true ? "bg-slate-400" : "bg-slate-800"
      } text-white rounded-lg py-3 px-6 w-fit`}
      onClick={onClick}
      disabled={disabled ?? true}
    >
      {children}
    </button>
  );
}

export default Button;
