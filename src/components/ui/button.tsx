import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost";
  size?: "icon";
}

export function Button({ children, className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={classNames(
        "p-2 rounded-md focus:outline-none",
        {
          "hover:bg-violet-700": variant === "ghost",
          "w-8 h-8": size === "icon",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
