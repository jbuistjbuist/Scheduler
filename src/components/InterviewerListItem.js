import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

/**
 *
 * @param {object} props receives props from parent element
 * @returns {JSX.Element} returns JSX component which represents a single interviewer
 */
export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = { ...props };

  //changes styling based on whether interviewer is selected
  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={classes} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
