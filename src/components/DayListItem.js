import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let classes = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

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
