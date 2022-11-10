import React from "react";
import classNames from "classnames";
import "components/Button.scss";

/**
 *
 * @param {object} props receives props from parent element
 * @returns {JSX.Element} returns JSX component which renders a button. style is specified using the props received.
 */
export default function Button(props) {
  let buttonClasses = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      onClick={props.onClick}
      className={buttonClasses}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
