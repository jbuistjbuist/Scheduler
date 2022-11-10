import React from "react";

/**
 *
 * @param {object} props receives props from parent element
 * @returns {JSX.Element} returns JSX component for when appointment slot is empty
 */
export default function Empty(props) {
  const { onAdd } = props;

  return (
    <main className="appointment__add">
      <img
        onClick={onAdd}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}
