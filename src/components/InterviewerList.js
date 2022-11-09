import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
