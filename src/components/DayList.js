import React from "react";
import DayListItem from "./DayListItem";

/**
 *
 * @param {object} props receives props from parent element
 * @returns {JSX.Element} returns JSX component which renders the list of days.
 */
export default function DayList(props) {
  //create an array of daylistitem elements and render them
  const dayListItems = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={props.onChange}
        selected={day.name === props.value}
      />
    );
  });

  return <ul>{dayListItems}</ul>;
}
