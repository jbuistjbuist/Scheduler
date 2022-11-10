import React from "react";

/**
 *
 * @param {object} props receives props from parent element
 * @returns {JSX.Element} returns JSX component which is shown while an appointment is being deleted or saved.
 */
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold"> {props.message} </h1>
    </main>
  );
}
