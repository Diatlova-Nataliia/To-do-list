import React from "react";
import { Link, LinkProps } from "react-router";
import "./Button.scss";

interface ButtonProps {
  to?: LinkProps["to"];
  onClick?: () => void;
  className?: string;
  search?: string;
  active?: boolean;
  size?: "small" | "default";
  type?: "outline" | "drop-down" | "default";
}

const Button = ({
  to,
  className,
  children,
  size = "default",
  onClick,
  type = "default",
  active,
}: React.PropsWithChildren<ButtonProps>) => {
  const classes = ["button", `button_size_${size}`, `button_type_${type}`];

  if (active) {
    classes.push("button_active");
  }

  if (className) {
    classes.push(className);
  }

  const classNames = classes.join(" ");

  if (to) {
    return (
      <Link to={to} className={classNames}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button className={classNames} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <button className={classNames}>{children}</button>;
};

export default Button;
