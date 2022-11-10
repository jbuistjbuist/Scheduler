import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

/**
 *
 * @param {object} props receives props from parent element
 * @returns {JSX.Element} returns JSX component which contains a list of available interviewers.
 */
export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  //create an array of individual interviewer elements based on provided data
  const Interviewers = interviewers
    ? interviewers.map((person) => {
        const { id, name, avatar } = person;

        return (
          <InterviewerListItem
            key={id}
            name={name}
            avatar={avatar}
            setInterviewer={() => onChange(id)}
            selected={id === value}
          />
        );
      })
    : null;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{Interviewers}</ul>
    </section>
  );
}

//using proptypes library to assert that interviewers is required and should be an array.
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
