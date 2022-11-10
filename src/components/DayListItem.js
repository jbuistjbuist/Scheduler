import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

/**
 *
 * @param {object} props receives props from parent element
 * @returns {JSX.Element} returns JSX component which renders a day item.
 */
export default function DayListItem(props) {
  //different styling depending on whether day is selected or full
  let classes = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  //need to change grammar of message depending on the value of spots remaining
  const formatSpots = function (spots) {
    return spots === 0
      ? "no spots "
      : spots === 1
      ? "1 spot "
      : `${spots} spots `;
  };

  let spots = formatSpots(props.spots);

  return (
    <li
      data-testid="day"
      onClick={() => props.setDay(props.name)}
      className={classes}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spots} remaining</h3>
    </li>
  );
}
